export const resume =
  "https://drive.google.com/file/d/1Kky3GDFarvykiwOxMd8-AUv9vryx9Vrn/view?usp=sharing";
export const projects = [
  {
    id: "prepwise",
    name: "PrepWise",
    discipline: "Speech and visual feedback for interview practice.",
    tools: ["Whisper", "MediaPipe", "FastAPI", "WebSockets", "Docker"],
    challenge:
      "Interview practice often lacks immediate, structured feedback on both the answer and its delivery.",
    build:
      "Streamed interview sessions through WebSockets, transcribed speech with Whisper and extracted visual cues with MediaPipe. FastAPI brings the workflow together; Docker keeps the application reproducible.",
    result:
      "A practical coaching workflow combining speech and visual performance signals in a real-time feedback loop.",
    link: "https://github.com/Akashpatel2609/PrepWise",
    linkText: "Explore the source",
  },
  {
    id: "executive-analytics",
    name: "Executive analytics",
    discipline: "Finance and operations reporting at Maple Reinders.",
    tools: ["Power BI", "DAX", "SQL", "Power Query", "SharePoint", "Vena"],
    challenge:
      "Recurring leadership reporting depended on scattered spreadsheets and manual preparation across finance and operations.",
    build:
      "Mapped forecasting, margin, resource planning, operational KPIs and risk reporting needs. Connected SQL, Power Query, SharePoint, scheduled Power BI refreshes and Vena data loads into repeatable workflows.",
    result:
      "Shipped 10+ dashboards and reduced 6–8 hours of recurring weekly manual reporting. Vena preparation fell from 3–4 hours to 15–20 minutes.",
    link: "mailto:26akashpatel99@gmail.com?subject=Executive%20analytics",
    linkText: "Talk about this work",
    note: "Internal work. Company data and reporting screenshots are kept private.",
  },
  {
    id: "amazon-etl",
    name: "Amazon Reviews ETL",
    discipline: "34.7M reviews processed.",
    tools: ["Pig", "Hive", "SSIS", "SQL Server", "Power BI"],
    challenge:
      "Raw, nested JSON reviews needed structure and cleaning before they could support efficient stakeholder analysis.",
    build:
      "Processed reviews using Pig and Hive, transformed and loaded analytical tables with SSIS and SQL Server, and created Power BI outputs for sentiment and product reporting.",
    result:
      "Processed 34.7 million records and reduced stakeholder data preparation time by 70%.",
    link: "https://app.powerbi.com/groups/me/reports/ad3635ea-f1f3-47f5-a5c2-936a4073bfdd/38e0b2f42920542e9818?experience=power-bi",
    linkText: "View the Power BI report",
    note: "Microsoft sign-in and access permission may be required.",
  },
];
