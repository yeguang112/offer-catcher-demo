import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobs } from '../app/data'
import type { CandidateProfile } from '../app/types'
import { useProfile } from '../app/use-profile'
import sceneHr from '../assets/quest/scene-hr.png'
import sceneInterview from '../assets/quest/scene-interview.png'
import sceneJd from '../assets/quest/scene-jd.png'
import scenePortfolio from '../assets/quest/scene-portfolio.png'
import sceneResearch from '../assets/quest/scene-research.png'
import sceneResume from '../assets/quest/scene-resume.png'
import sceneStrategy from '../assets/quest/scene-strategy.png'
import DecryptedText from '../components/interactions/DecryptedText'
import ShinyText from '../components/interactions/ShinyText'
import SpotlightSurface from '../components/interactions/SpotlightSurface'

type AbilityKey = 'direction' | 'resume' | 'communication' | 'interview'

type Choice = {
  label: string
  detail: string
  response: string
  tags: string[]
  delta: Partial<Record<AbilityKey, number>>
}

type Scene = {
  title: string
  stage: string
  desc: string
  image: string
  imageAlt: string
  focus: string
  directorNote: string
  choices: Choice[]
}

const abilityLabels: Record<AbilityKey, string> = {
  direction: '岗位理解',
  resume: '简历证据',
  communication: '沟通推进',
  interview: '面试表达',
}

const scenes: Scene[] = [
  {
    stage: '01 / JD 来了',
    title: '深夜刷到一条心动的 AI 产品实习 JD，你第一步怎么做？',
    desc: '它写着需求分析、竞品研究、Agent 场景探索。你只有 40 分钟决定今晚怎么行动。',
    image: sceneJd,
    imageAlt: '学生在夜晚查看岗位 JD 的场景插画',
    focus: '岗位理解',
    directorNote: '这一幕测试你会不会先看清岗位，而不是被“心动”带着走。',
    choices: [
      {
        label: '先拆 JD，找出 5 个关键词',
        detail: '判断岗位到底在筛什么人，再决定简历怎么对齐。',
        response: '你把 JD 拆成能力、经历、关键词三列。岗位理解和简历命中同步上升。',
        tags: ['JD拆解者', '关键词意识'],
        delta: { direction: 16, resume: 8 },
      },
      {
        label: '先收藏，明天再说',
        detail: '保护精力，但容易错过最佳整理窗口。',
        response: '你保留了体力，但机会没有被加工。系统提醒：好岗位需要及时拆解。',
        tags: ['节奏保守'],
        delta: { direction: 4 },
      },
      {
        label: '直接投递，先试试看',
        detail: '行动很快，但简历可能还没对齐。',
        response: '你获得了速度，但简历没有命中 JD。系统标记：初筛风险上升。',
        tags: ['行动派', '海投风险'],
        delta: { resume: -8, direction: 3 },
      },
    ],
  },
  {
    stage: '02 / 岗位侦察',
    title: '你想知道这个岗位是不是真的适合自己，会先查什么？',
    desc: '同样叫“产品实习”，有的偏需求落地，有的偏数据分析，有的偏运营协同。你需要找到信号。',
    image: sceneResearch,
    imageAlt: '学生在桌前研究岗位信息和公司信号的场景插画',
    focus: '方向判断',
    directorNote: '这一幕考察你是否会把岗位名拆成真实工作场景。',
    choices: [
      {
        label: '对比 3 条同类 JD，归纳高频能力',
        detail: '用样本找到共性，而不是只看一个岗位的包装。',
        response: '你找到了“需求拆解、数据判断、跨团队推进”这些重复出现的信号，方向判断更稳。',
        tags: ['岗位侦察', '样本意识'],
        delta: { direction: 14, resume: 6 },
      },
      {
        label: '只看公司名气，越大越值得投',
        detail: '品牌很重要，但岗位内容才决定匹配度。',
        response: '你被品牌吸引了，但还没证明自己适合这个岗位。系统提醒：公司光环不能替代岗位理解。',
        tags: ['品牌滤镜'],
        delta: { direction: -4, communication: 2 },
      },
      {
        label: '去社媒搜经验帖，看看别人怎么说',
        detail: '能补信息，但要避免只吸收情绪和碎片。',
        response: '你获得了现场感，但信息质量参差不齐。建议把经验帖转成可验证的问题清单。',
        tags: ['信息收集者'],
        delta: { direction: 7, communication: 3 },
      },
    ],
  },
  {
    stage: '03 / 简历急救',
    title: '你发现最相关的项目，被写成了“参与调研和分析”。',
    desc: '这句话很安全，也很空。HR 看完可能不知道你到底做出了什么。',
    image: sceneResume,
    imageAlt: '学生修改简历内容的场景插画',
    focus: '简历证据',
    directorNote: '这一幕测试你能不能把经历翻译成岗位看得懂的证据。',
    choices: [
      {
        label: '改成“场景-动作-结果-复盘”',
        detail: '把项目写成证据，而不是流水账。',
        response: '你把“参与”改成了具体动作和结果。简历开始像证据了。',
        tags: ['证据密度提升', 'STAR表达'],
        delta: { resume: 20, interview: 7 },
      },
      {
        label: '加一些高级词显得专业',
        detail: '闭环、赋能、抓手，看起来熟悉但可能更虚。',
        response: '简历更像模板，但没有新增事实。高级词不能替代具体证据。',
        tags: ['黑话预警'],
        delta: { resume: -6, communication: 3 },
      },
      {
        label: '把所有项目都放上去',
        detail: '宁可多，不要漏。',
        response: '信息量上来了，重点却被冲淡。初筛不是考古，HR 只找最相关证据。',
        tags: ['重点分散'],
        delta: { resume: -4, direction: 5 },
      },
    ],
  },
  {
    stage: '04 / 作品证据包',
    title: '简历还差一点说服力，你会怎么补一份作品证据？',
    desc: '对学生来说，作品不一定是完整产品，也可以是拆解报告、原型、复盘文档或数据看板。',
    image: scenePortfolio,
    imageAlt: '学生整理作品证据包和项目材料的场景插画',
    focus: '经历补强',
    directorNote: '这一幕测试你是否会用作品降低“经验不足”的风险。',
    choices: [
      {
        label: '做一页岗位相关作品集，突出问题、过程和结果',
        detail: '把能力可视化，让 HR 和面试官更快看到证据。',
        response: '你的项目从“说过”变成了“看得见”。简历证据和面试表达都被补强。',
        tags: ['作品补强', '证据可视化'],
        delta: { resume: 18, interview: 10 },
      },
      {
        label: '把所有截图打包发过去',
        detail: '材料很多，但对方需要自己理解重点。',
        response: '你提供了素材，却没有提供叙事。作品集不是相册，需要有主线。',
        tags: ['材料堆叠'],
        delta: { resume: -3, interview: 2 },
      },
      {
        label: '先不补作品，等面试问到再解释',
        detail: '省时间，但初筛阶段可能等不到解释机会。',
        response: '你保留了精力，但把主动权交给了对方。初筛更喜欢低成本可验证证据。',
        tags: ['证据后置'],
        delta: { resume: -5, communication: 2 },
      },
    ],
  },
  {
    stage: '05 / HR 私信',
    title: 'HR 问你：为什么想投这个方向？',
    desc: '这不是寒暄，是一次低成本初筛。你需要证明动机、理解和匹配。',
    image: sceneHr,
    imageAlt: '学生和 HR 进行线上沟通的场景插画',
    focus: '沟通推进',
    directorNote: '这一幕测试你能不能把“喜欢”说成可信的岗位动机。',
    choices: [
      {
        label: '用“岗位理解 + 个人证据 + 近期准备”回答',
        detail: '不只说喜欢，而是证明你已经开始准备。',
        response: '你的回复具体、可信、有方向。HR 会更愿意继续聊下去。',
        tags: ['动机可信', '沟通清晰'],
        delta: { communication: 20, direction: 10 },
      },
      {
        label: '回答“我一直对互联网感兴趣”',
        detail: '真诚，但太泛。',
        response: '这句话没有错，但和任何岗位都能匹配。真诚需要具体化。',
        tags: ['表达泛化'],
        delta: { communication: 2, direction: -4 },
      },
      {
        label: '反问 HR：这个岗位主要做什么？',
        detail: '先把信息问清楚。',
        response: '你获得了信息，但也暴露准备不足。更好的做法是先说理解，再补问关键问题。',
        tags: ['信息补全', '准备不足'],
        delta: { communication: 5, direction: 2 },
      },
    ],
  },
  {
    stage: '06 / 模拟面试',
    title: '面试官让你讲一个推动项目落地的经历。',
    desc: '这题考的不只是表达，还有你能不能把经历翻译成岗位能力。',
    image: sceneInterview,
    imageAlt: '学生参加线上模拟面试的场景插画',
    focus: '面试表达',
    directorNote: '这一幕测试你是否能先给结论，再用故事证明能力。',
    choices: [
      {
        label: '先给结论，再展开背景、动作和结果',
        detail: '让面试官先知道你想证明什么。',
        response: '你没有从流水账开始，而是先说这段经历证明了什么。表达命中。',
        tags: ['结论先行', '能力翻译'],
        delta: { interview: 22, communication: 7 },
      },
      {
        label: '从项目起因开始完整讲一遍',
        detail: '细节很多，但容易失焦。',
        response: '你讲得很努力，但面试官需要自己提炼重点。面试不是复述，是证明。',
        tags: ['叙事过长'],
        delta: { interview: -5, communication: 3 },
      },
      {
        label: '重点讲团队多么不容易',
        detail: '体现协作，但个人贡献不明显。',
        response: '故事有温度，但你的角色模糊了。团队经历也要讲清你的动作。',
        tags: ['个人贡献模糊'],
        delta: { interview: -3, communication: 5 },
      },
    ],
  },
  {
    stage: '07 / 投递策略',
    title: '你拿到了 8 个相似岗位，准备开始投递。',
    desc: '最后一步不是全部投完，而是设计冲刺、主投和保底的节奏。',
    image: sceneStrategy,
    imageAlt: '学生规划多个岗位投递节奏的场景插画',
    focus: '投递节奏',
    directorNote: '这一幕测试你是否会经营求职漏斗，而不是只凭情绪投递。',
    choices: [
      {
        label: '分成冲刺、主投、保底，并准备不同简历版本',
        detail: '把求职当成策略，而不是许愿。',
        response: '你拥有了清晰投递节奏：主投岗位优先定制，冲刺岗位准备作品补强。',
        tags: ['投递策略', '版本管理'],
        delta: { direction: 12, resume: 10, interview: 5 },
      },
      {
        label: '每天投 20 个，数量就是胜利',
        detail: '提高样本量，但消耗也高。',
        response: '你获得了数量，但也增加了无效反馈。求职需要样本，也需要复盘。',
        tags: ['海投模式'],
        delta: { resume: -5, direction: 3 },
      },
      {
        label: '只投最喜欢的 1 个岗位',
        detail: '专注，但风险集中。',
        response: '你很坚定，但样本太少。保留热爱，也要设计容错。',
        tags: ['高专注', '样本不足'],
        delta: { direction: 8, interview: 2 },
      },
    ],
  },
]

const initialAbilities: Record<AbilityKey, number> = {
  direction: 42,
  resume: 38,
  communication: 40,
  interview: 36,
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value))
}

function getEnding(abilities: Record<AbilityKey, number>, tags: string[]) {
  const average = Math.round(
    (abilities.direction + abilities.resume + abilities.communication + abilities.interview) / 4,
  )
  const strongest = Object.entries(abilities).sort((a, b) => b[1] - a[1])[0][0] as AbilityKey

  if (average >= 76) {
    return {
      title: '高命中求职玩家',
      subtitle: '你不是在海投，而是在经营一次有证据的求职战役。',
      passRate: Math.min(96, average + 10),
      role: strongest,
      advice: [
        '为主投岗位单独做关键词版本，别用一份简历打全场。',
        '整理 3 个可复用面试故事：推进、分析、复盘。',
        '每投 5 个岗位做一次反馈复盘，及时调整目标池。',
      ],
      tags,
    }
  }

  if (abilities.resume < 55) {
    return {
      title: '潜力待翻译型候选人',
      subtitle: '你有经历，但还没有把经历翻译成岗位能看懂的证据。',
      passRate: Math.max(52, average + 4),
      role: strongest,
      advice: [
        '优先改简历，不急着扩大投递量。',
        '每段经历都补上动作、结果和岗位关键词。',
        '做一页作品证据包，把项目截图变成有主线的能力证明。',
      ],
      tags,
    }
  }

  if (abilities.direction < 55) {
    return {
      title: '方向探索型玩家',
      subtitle: '你愿意行动，但需要先把岗位地图看清楚。',
      passRate: Math.max(50, average + 2),
      role: strongest,
      advice: [
        '先做 3 个目标岗位的 JD 拆解，找高频能力。',
        '不要只看岗位名，要看真实工作场景和经历证据。',
        '用画像测评补一次职业方向，再回到匹配看板。',
      ],
      tags,
    }
  }

  return {
    title: '稳健成长型候选人',
    subtitle: '你已经有基本节奏，下一步是提高表达密度和投递策略。',
    passRate: Math.max(58, average + 6),
    role: strongest,
    advice: [
      '选择 3 个主投岗位做定制简历。',
      '准备一段 60 秒岗位动机回答。',
      '把每次面试反馈记录成下一轮优化清单。',
    ],
    tags,
  }
}

function buildQuestProfile(ending: ReturnType<typeof getEnding>, abilities: Record<AbilityKey, number>): CandidateProfile {
  const roleMap: Record<AbilityKey, string> = {
    direction: 'AI 产品',
    resume: '商业分析',
    communication: 'HR职能',
    interview: '产品经理',
  }

  return {
    name: '副本候选人',
    grade: '在校生 / 校招准备期',
    major: '跨专业求职探索',
    targetCity: '深圳',
    targetRole: roleMap[ending.role],
    strengths: [
      abilities.direction >= 60 ? '结构化表达' : '用户研究',
      abilities.resume >= 60 ? '数据分析' : '跨团队协作',
      abilities.communication >= 60 ? '沟通表达' : '项目推进',
      abilities.interview >= 60 ? '复盘意识' : '业务洞察',
    ],
    interests: ['产品经理', 'AI 应用', '商业分析'],
    experienceTags: ['校园产品项目', '社团运营', '数据可视化作品'],
    resumeSignals: ['岗位动机已校准', '项目证据需强化', '关键词覆盖可提升'],
    summary: `你在求职副本中的结局是“${ending.title}”。建议优先围绕 ${roleMap[ending.role]} 方向完善简历，并用岗位关键词强化经历证据。`,
  }
}

export function QuestSimulatorPage() {
  const navigate = useNavigate()
  const { setProfile, selectJob } = useProfile()
  const [started, setStarted] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [abilities, setAbilities] = useState(initialAbilities)
  const [tags, setTags] = useState<string[]>([])
  const [path, setPath] = useState<string[]>([])
  const [narration, setNarration] = useState('')
  const [showChoices, setShowChoices] = useState(true)
  const [finished, setFinished] = useState(false)

  const scene = scenes[sceneIndex]
  const ending = useMemo(() => getEnding(abilities, tags), [abilities, tags])

  const choose = (choice: Choice) => {
    setAbilities((current) => ({
      direction: clampScore(current.direction + (choice.delta.direction ?? 0)),
      resume: clampScore(current.resume + (choice.delta.resume ?? 0)),
      communication: clampScore(current.communication + (choice.delta.communication ?? 0)),
      interview: clampScore(current.interview + (choice.delta.interview ?? 0)),
    }))
    setTags((current) => Array.from(new Set([...current, ...choice.tags])))
    setPath((current) => [...current, choice.label])
    setNarration(choice.response)
    setShowChoices(false)
  }

  const next = () => {
    if (sceneIndex >= scenes.length - 1) {
      setFinished(true)
      return
    }
    setSceneIndex((current) => current + 1)
    setNarration('')
    setShowChoices(true)
  }

  const restart = () => {
    setStarted(false)
    setSceneIndex(0)
    setAbilities(initialAbilities)
    setTags([])
    setPath([])
    setNarration('')
    setShowChoices(true)
    setFinished(false)
  }

  const applyResult = () => {
    setProfile(buildQuestProfile(ending, abilities))
    selectJob(jobs[0].id)
    navigate('/results')
  }

  if (!started) {
    return (
      <main className="quest-screen quest-opening">
        <section className="quest-opening-card">
          <div className="quest-opening-copy">
            <span className="quest-eyebrow"><ShinyText text="Offer Quest Simulator" color="rgba(255,255,255,0.58)" shineColor="#ffffff" /></span>
            <h1><DecryptedText text="把一次求职，拆成 7 幕可选择的现场。" revealDirection="center" /></h1>
            <p>
              不是大字海报，也不是单页问卷。每一幕都有对应场景图和一个真实求职决策：从 JD、岗位侦察、简历急救，到 HR 私信、面试和投递策略。
            </p>
            <div className="quest-actions">
              <button className="primary-action" type="button" onClick={() => setStarted(true)}>
                开始 7 幕求职副本
              </button>
              <button className="secondary-action" type="button" onClick={() => navigate('/intake/quiz')}>
                先做职业画像
              </button>
            </div>
          </div>

          <SpotlightSurface className="quest-cover-panel cursor-target">
            <div className="quest-cover-summary">
              <span>剧情式诊断</span>
              <strong>每个选择，都回到真实求职能力。</strong>
              <p>结局会生成初筛命中率、风险标签和下一步建议，并可回流岗位匹配。</p>
            </div>
            <figure className="quest-cover-hero-image">
              <img src={sceneJd} alt="学生查看岗位 JD 的求职副本预览图" />
            </figure>
            <div className="quest-cover-steps" aria-label="副本关卡预览">
              {scenes.map((item, index) => (
                <i key={item.stage}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  {item.focus}
                </i>
              ))}
            </div>
          </SpotlightSurface>
        </section>
      </main>
    )
  }

  if (finished) {
    return (
      <main className="quest-screen">
        <section className="ending-card">
          <div className="ending-score">
            <span>初筛命中率模拟</span>
            <strong>{ending.passRate}%</strong>
          </div>
          <div className="ending-copy">
            <span className="quest-eyebrow"><ShinyText text="Quest Ending" color="rgba(255,255,255,0.58)" shineColor="#ffffff" /></span>
            <h1><DecryptedText text={ending.title} revealDirection="center" /></h1>
            <p>{ending.subtitle}</p>
            <div className="ending-tags">
              {ending.tags.slice(0, 10).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="ending-advice">
            <h3>下一步建议</h3>
            <ul>
              {ending.advice.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="quest-actions">
              <button className="primary-action" type="button" onClick={applyResult}>
                带着结局去匹配岗位
              </button>
              <button className="secondary-action" type="button" onClick={restart}>
                重新开局
              </button>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="quest-screen">
      <section className="quest-layout quest-layout-immersive">
        <section className="scene-card scene-card-immersive">
          <div className="scene-canvas">
            <img className="scene-backdrop" src={scene.image} alt={scene.imageAlt} />
            <div className="scene-canvas-shade" aria-hidden="true" />

            <div className="scene-canvas-top">
              <div>
                <span>{scene.stage}</span>
                <strong>{scene.focus}</strong>
              </div>
              <em>
                {sceneIndex + 1}/{scenes.length}
              </em>
            </div>

            <SpotlightSurface className="scene-glass-panel cursor-target">
              <span className="scene-kicker"><ShinyText text={scene.focus} color="rgba(255,255,255,0.62)" shineColor="#ffffff" /></span>
              <h1><DecryptedText key={scene.stage} text={scene.title} revealDirection="center" /></h1>
              <p>{scene.desc}</p>
              <div className="director-note">{scene.directorNote}</div>

              {showChoices ? (
                <div className="choice-stack">
                  {scene.choices.map((choice) => (
                    <button key={choice.label} type="button" className="quest-choice" onClick={() => choose(choice)}>
                      <strong>{choice.label}</strong>
                      <span>{choice.detail}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="narration-card">
                  <span>系统反馈</span>
                  <p>{narration}</p>
                  <button className="primary-action" type="button" onClick={next}>
                    {sceneIndex >= scenes.length - 1 ? '查看我的结局卡' : '进入下一幕'}
                  </button>
                </div>
              )}
            </SpotlightSurface>

            <div className="scene-dot-rail" aria-label="副本进度">
              {scenes.map((item, index) => (
                <span key={item.stage} className={index === sceneIndex ? 'active' : ''} aria-label={item.stage} />
              ))}
            </div>
          </div>
        </section>

        <aside className="quest-sidepanel">
          <section className="quest-status">
            <div className="quest-progress">
              <span>能力仪表</span>
              <strong>{Math.round((abilities.direction + abilities.resume + abilities.communication + abilities.interview) / 4)}</strong>
            </div>
            <div className="ability-list">
              {(Object.keys(abilityLabels) as AbilityKey[]).map((key) => (
                <div key={key} className="ability-row">
                  <div>
                    <span>{abilityLabels[key]}</span>
                    <strong>{abilities[key]}</strong>
                  </div>
                  <i>
                    <b style={{ width: `${abilities[key]}%` }} />
                  </i>
                </div>
              ))}
            </div>
          </section>

          <section className="path-card">
            <span>选择轨迹</span>
            {path.length === 0 ? (
              <p>还没有做出选择。真正的求职差距，往往藏在每一次下意识反应里。</p>
            ) : (
              <ol>
                {path.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ol>
            )}
          </section>

          <section className="tag-bank">
            <span>掉落标签</span>
            <div>
              {tags.length === 0 ? <small>做出选择后会出现标签</small> : tags.map((tag) => <em key={tag}>{tag}</em>)}
            </div>
          </section>
        </aside>
      </section>
    </main>
  )
}
