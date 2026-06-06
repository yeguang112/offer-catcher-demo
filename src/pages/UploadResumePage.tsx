import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { buildProfileFromResumeText } from '../app/data'
import { useProfile } from '../app/use-profile'
import { StepRail } from '../components/StepRail'

const resumeSamples = [
  {
    id: 'sample-product',
    label: '产品型简历样例',
    content:
      '负责校园产品项目，进行用户访谈、需求分析和数据复盘；实习中协同产品与运营推进功能优化；有可视化分析作品与量化成果。',
  },
  {
    id: 'sample-data',
    label: '分析型简历样例',
    content:
      '参与商业分析实习，使用 SQL 和 Excel 完成数据清洗、洞察输出和周报汇报；有竞赛获奖与数据看板搭建经历。',
  },
  {
    id: 'sample-growth',
    label: '增长型简历样例',
    content:
      '负责社团活动策划与用户运营，参与新媒体内容增长与活动转化分析；有内容平台运营和校园项目经历。',
  },
]

export function UploadResumePage() {
  const navigate = useNavigate()
  const { parseResumeText } = useProfile()
  const [resumeText, setResumeText] = useState(resumeSamples[0].content)
  const [fileName, setFileName] = useState('YeGuang_resume_product.pdf')
  const previewProfile = buildProfileFromResumeText(resumeText)

  return (
    <main>
      <section className="section page-hero">
        <div className="page-hero-copy">
          <span className="section-kicker">入口 01 / 简历解析</span>
          <h1>先把你是谁说清楚，再谈岗位匹配。</h1>
          <p>
            上传页只完成一件事：建立候选人画像。完成后再进入岗位看板，整个流程会更像真实求职产品，而不是把所有卡片塞在一起。
          </p>
        </div>
        <aside className="hero-panel compact-panel">
          <div className="hero-panel-header">
            <span>当前阶段</span>
            <strong>生成画像</strong>
          </div>
          <StepRail currentStep="profile" />
        </aside>
      </section>

      <section className="section workspace-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">简历输入</span>
              <h3>上传文件，或直接粘贴简历内容。</h3>
            </div>
            <strong>Demo 模拟解析</strong>
          </div>

          <label className="upload-dropzone">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) setFileName(file.name)
              }}
            />
            <span className="upload-icon">PDF</span>
            <strong>点击选择简历文件</strong>
            <p>当前 Demo 会读取文件名并用下方文本模拟解析，后续可接入真实 PDF / DOCX 解析。</p>
          </label>

          <div className="file-card">
            <div>
              <span>已选择文件</span>
              <strong>{fileName}</strong>
            </div>
            <small>解析准备完成</small>
          </div>

          <label className="field">
            <span>简历文本</span>
            <textarea rows={9} value={resumeText} onChange={(event) => setResumeText(event.target.value)} />
          </label>

          <div className="hero-actions">
            <button
              type="button"
              className="primary-action button-reset"
              onClick={() => {
                parseResumeText(resumeText)
                navigate('/results')
              }}
            >
              生成画像并进入匹配看板
            </button>
          </div>
        </article>

        <aside className="panel">
          <div className="panel-header">
            <div>
              <span className="section-kicker">实时画像预览</span>
              <h3>{previewProfile.targetRole}</h3>
            </div>
            <strong>{previewProfile.targetCity}</strong>
          </div>

          <div className="profile-preview">
            <div>
              <label>候选人类型</label>
              <h4>{previewProfile.name}</h4>
              <p>{previewProfile.summary}</p>
            </div>
            <div className="tag-panel">
              <label>能力信号</label>
              <div className="tag-row">
                {previewProfile.strengths.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <div className="tag-panel">
              <label>经历证据</label>
              <div className="tag-row">
                {previewProfile.experienceTags.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="sample-list">
            {resumeSamples.map((sample) => (
              <button
                key={sample.id}
                type="button"
                className="sample-card"
                onClick={() => {
                  setResumeText(sample.content)
                  setFileName(`${sample.id}.pdf`)
                }}
              >
                <strong>{sample.label}</strong>
                <p>{sample.content}</p>
              </button>
            ))}
          </div>
        </aside>
      </section>
    </main>
  )
}
