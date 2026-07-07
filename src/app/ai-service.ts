/**
 * AI 简历定制服务
 * 对接 DeepSeek API，参考 AutoApply-AI 的 resume tailoring 逻辑
 */

const DEEPSEEK_API_URL =
  import.meta.env.VITE_DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions'

const getApiKey = (): string => {
  const key = import.meta.env.VITE_DEEPSEEK_API_KEY
  if (!key) {
    throw new Error('未配置 VITE_DEEPSEEK_API_KEY，请在 .env.local 中设置')
  }
  return key
}

export type AIResumeResult = {
  audit: {
    keywordCoverage: number
    evidenceDensity: number
    roleFocus: number
    atsPassRate: number
    summary: string
    actions: string[]
  }
  rewritePack: {
    before: string
    after: string
    bullets: string[]
  }
  weeklyPlan: string[]
}

/**
 * 调用 DeepSeek API，获取简历定制分析结果
 * Prompt 设计参考 AutoApply-AI 的 resume tailoring 思路：
 * - 让 AI 扮演专业简历顾问
 * - 输入：候选人画像 + 目标岗位 JD
 * - 输出：ATS 评分、改写示例、一周行动计划（结构化 JSON）
 */
export async function generateResumeLabContent(
  profile: {
    name: string
    grade: string
    major: string
    targetCity: string
    targetRole: string
    strengths: string[]
    interests: string[]
    experienceTags: string[]
    resumeSignals: string[]
    summary: string
  },
  job: {
    id: string
    title: string
    company: string
    city: string
    type: string
    salary: string
    tags: string[]
    strengthsWanted: string[]
    interestsWanted: string[]
    experienceWanted: string[]
    jdKeywords: string[]
    challenge: string
  },
): Promise<AIResumeResult> {
  const systemPrompt = `你是一位专注于大学生求职的资深简历顾问，擅长针对具体岗位 JD 优化简历，提高 ATS（招聘系统自动筛选）通过率。

你需要分析候选人的背景与目标岗位的匹配度，并输出结构化的简历优化建议。

输出格式必须是合法的 JSON，不包含任何 Markdown 代码块标记，直接返回 JSON 对象。`

  const userPrompt = `请针对以下候选人和目标岗位，输出简历优化分析。

## 候选人画像
- 姓名：${profile.name}
- 年级：${profile.grade}
- 专业：${profile.major}
- 目标城市：${profile.targetCity}
- 目标方向：${profile.targetRole}
- 优势技能：${profile.strengths.join('、')}
- 兴趣方向：${profile.interests.join('、')}
- 经历标签：${profile.experienceTags.join('、')}
- 简历信号：${profile.resumeSignals.join('、')}
- 自我总结：${profile.summary}

## 目标岗位
- 职位：${job.title}
- 公司：${job.company}
- 城市：${job.city}
- 类型：${job.type}
- 薪资：${job.salary}
- 岗位标签：${job.tags.join('、')}
- 期望优势：${job.strengthsWanted.join('、')}
- 期望兴趣：${job.interestsWanted.join('、')}
- 期望经历：${job.experienceWanted.join('、')}
- JD 关键词：${job.jdKeywords.join('、')}
- 当前挑战：${job.challenge}

## 输出要求

请输出以下 JSON 结构（注意：不要使用 Markdown 代码块，直接返回 JSON）：

{
  "audit": {
    "keywordCoverage": <0-100 整数，简历中覆盖 JD 关键词的百分比估算>,
    "evidenceDensity": <0-100 整数，简历中量化成果和证据密度评分>,
    "roleFocus": <0-100 整数，简历方向与该岗位的聚焦度>,
    "atsPassRate": <0-100 整数，预估 ATS 自动筛选通过率>,
    "summary": "<50字以内的中文总结，说明当前简历的主要短板或优势>",
    "actions": ["<具体可操作的第1条建议>", "<第2条>", "<第3条>", "<第4条>"]
  },
  "rewritePack": {
    "before": "<一段典型的模糊经历描述（改写前），基于候选人背景虚构一个真实感的例子>",
    "after": "<同一段经历针对该岗位 JD 改写后的版本，突出关键词和量化成果>",
    "bullets": ["<第1条改写要点>", "<第2条>", "<第3条>"]
  },
  "weeklyPlan": [
    "<第1天行动计划，具体到动作>",
    "<第2天>",
    "<第3天>",
    "<第4天>",
    "<第5天>",
    "<第6天>",
    "<第7天>"
  ]
}

## 评分标准参考
- keywordCoverage：候选人优势/兴趣/经历与 jdKeywords 的重叠比例 × 100
- evidenceDensity：简历中是否有量化成果（数字、比例、金额等），有则 60+，丰富则 80+
- roleFocus：简历方向描述与目标岗位 title 的吻合度
- atsPassRate：综合以上三项，加权计算，上限 96

## 改写示例要求
- before：模糊、缺乏量化、 missing JD 关键词
- after：包含 2-3 个 JD 关键词、有量化成果、动词开头、聚焦岗位需求
- bullets：具体说明改写了哪些地方，为什么更有效

## 一周计划要求
- 每天一个具体动作，可执行
- 前 3 天聚焦简历修改，中间 2 天聚焦投递准备，最后 2 天聚焦面试准备
- 计划要结合目标岗位的具体关键词和公司名`

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getApiKey()}`,
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`DeepSeek API 调用失败 (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? ''

    // 尝试解析 JSON（兼容有可能被包裹在代码块中的情况）
    let parsed: AIResumeResult
    try {
      const cleaned = content
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```$/, '')
        .trim()
      parsed = JSON.parse(cleaned)
    } catch {
      // 如果解析失败，尝试从文本中提取 JSON
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('AI 返回结果解析失败，请重试')
      }
    }

    // 基础校验
    if (!parsed.audit || !parsed.rewritePack || !parsed.weeklyPlan) {
      throw new Error('AI 返回结果格式不完整，请重试')
    }

    return parsed
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('调用 AI 服务时发生未知错误')
  }
}
