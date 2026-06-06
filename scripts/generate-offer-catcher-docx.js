import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  LevelFormat,
} = require("docx");

const outDir = path.resolve("docs");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "学生求职工作台方案说明.docx");

const contentWidth = 9026;
const blue = "1F4E79";
const lightBlue = "EAF3F8";
const gray = "666666";
const border = { style: BorderStyle.SINGLE, size: 1, color: "D9E2EA" };
const borders = { top: border, bottom: border, left: border, right: border };

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: "Microsoft YaHei",
    size: opts.size || 21,
    color: opts.color || "222222",
    bold: !!opts.bold,
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.LEFT,
    spacing: { before: opts.before || 80, after: opts.after || 80, line: 310 },
    children: [run(text, opts)],
  });
}

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 230, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "D8E6EF", space: 4 } },
    children: [run(text, { size: 27, bold: true, color: blue })],
  });
}

function table(rows, widths) {
  return new Table({
    width: { size: contentWidth, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map(
      (row, rowIndex) =>
        new TableRow({
          children: row.map(
            (cell, i) =>
              new TableCell({
                width: { size: widths[i], type: WidthType.DXA },
                borders,
                shading:
                  rowIndex === 0
                    ? { fill: blue, type: ShadingType.CLEAR }
                    : i === 0
                      ? { fill: lightBlue, type: ShadingType.CLEAR }
                      : undefined,
                margins: { top: 100, bottom: 100, left: 140, right: 140 },
                children: [
                  new Paragraph({
                    spacing: { before: 0, after: 0, line: 280 },
                    children: [
                      run(cell, {
                        size: 19,
                        bold: rowIndex === 0 || i === 0,
                        color: rowIndex === 0 ? "FFFFFF" : "222222",
                      }),
                    ],
                  }),
                ],
              }),
          ),
        }),
    ),
  });
}

const children = [
  new Paragraph({
    spacing: { before: 160, after: 40 },
    alignment: AlignmentType.CENTER,
    children: [run("Offer Catcher", { size: 44, bold: true, color: blue })],
  }),
  new Paragraph({
    spacing: { before: 0, after: 260 },
    alignment: AlignmentType.CENTER,
    children: [run("学生求职匹配工作台方案说明", { size: 30, bold: true, color: "333333" })],
  }),
  table(
    [
      ["项目字段", "内容"],
      ["项目名称", "Offer Catcher 学生求职匹配工作台"],
      ["提交人", "叶光｜2676177514@qq.com"],
      ["Demo形式", "React + Vite 多页面网页应用，支持 PC 与手机端访问"],
      ["部署路径", "GitHub 仓库 + Vercel 自动部署，仓库：yeguang112/offer-catcher-demo"],
    ],
    [2200, 6826],
  ),

  heading("一、问题诊断"),
  p(
    "学生求职的核心困难不是“信息不足”，而是岗位信息过载、个人定位模糊、简历与 JD 不会对齐。传统招聘官网只提供单向搜索，学生需要自己判断方向、筛岗位、改简历，低年级更容易停留在“我适合什么”的焦虑里；高年级则更关注“这份简历能不能过初筛”。因此产品需要同时解决方向判断、岗位匹配和简历优化三件事。",
  ),

  heading("二、方案设计"),
  p(
    "本 Demo 设计为多页面求职工作台：入口页负责引导，学生可选择上传/粘贴简历，也可进入 MBTI 式画像测评。测评采用决策树逻辑，根据回答动态追问，识别技术岗、HR 职能岗、产品经理、测试岗等方向，并生成候选人画像。结果页展示岗位匹配分、推荐理由、能力缺口、关键词建议；岗位详情页拆解 JD 要求；简历实验室提供一键改写方向和行动计划，形成“画像采集-岗位匹配-简历优化-投递准备”的闭环。",
  ),

  heading("三、AI 工具选型理由"),
  p(
    "前端使用 React + TypeScript + Vite，原因是开发速度快、组件复用强，适合搭建可运行 Demo。AI 能力在原型阶段采用规则引擎 + 决策树模拟，保证无后端也能稳定演示；后续可接入大模型 API 做简历解析、JD 语义匹配和改写生成。部署选择 GitHub + Vercel，适合静态前端一键上线，后续每次 push 自动更新公网版本。",
  ),

  heading("四、关键配置"),
  p(
    "路由层配置首页、简历入口、画像测评、匹配结果、岗位详情、简历实验室六类页面；数据层内置岗位库、能力标签、匹配权重和行动建议；交互层支持上传简历、文本粘贴、选择题分支、岗位卡片跳转、工作流步骤点击；样式层设置响应式断点，兼容宽屏 PC、普通笔记本与手机端。Vercel 配置 SPA rewrite，避免刷新子路由 404。",
  ),

  heading("五、迭代记录"),
  table(
    [
      ["版本", "迭代重点", "效果"],
      ["V1", "完成基础岗位匹配与简历建议", "验证核心闭环可跑通"],
      ["V2", "从单页改为多页面路径", "降低信息堆叠，流程更清晰"],
      ["V3", "加入动态决策树测评", "更准确识别求职方向"],
      ["V4", "优化响应式、字体层级与按钮交互", "提升 PC 与移动端体验"],
    ],
    [1300, 4200, 3526],
  ),

  heading("六、效果评估"),
  table(
    [
      ["评估维度", "当前表现"],
      ["可用性", "学生可从测评或简历进入，完整体验岗位匹配与简历优化"],
      ["解释性", "推荐结果包含匹配分、理由、缺口与关键词，不是黑箱推荐"],
      ["体验性", "多页面跳转、卡片式信息和移动端适配让流程更自然"],
      ["扩展性", "可继续接入真实岗位 API、简历解析模型、登录与数据沉淀"],
    ],
    [2200, 6826],
  ),

  heading("七、后续优化"),
  p(
    "下一步可加入真实简历文件解析、岗位爬取/企业岗位 API、投递记录看板和面试题生成；同时引入用户行为数据，持续校准匹配权重，让系统从“演示型智能体”升级为能长期陪伴学生求职决策的工作台。",
  ),
];

const doc = new Document({
  creator: "Codex",
  title: "学生求职工作台方案说明",
  description: "Offer Catcher 学生求职匹配工作台方案说明",
  styles: {
    default: {
      document: { run: { font: "Microsoft YaHei", size: 21 } },
      paragraph: { spacing: { line: 310 } },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 27, bold: true, font: "Microsoft YaHei", color: blue },
        paragraph: { spacing: { before: 230, after: 100 }, outlineLevel: 0 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT }],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1080, right: 1440, bottom: 1080, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [run("Offer Catcher 学生求职匹配工作台", { size: 17, color: gray })],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                run("第 ", { size: 17, color: gray }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Microsoft YaHei", size: 17, color: gray }),
                run(" 页", { size: 17, color: gray }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outPath, buffer);
  console.log(outPath);
});
