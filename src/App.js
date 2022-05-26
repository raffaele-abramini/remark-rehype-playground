import React, { useEffect, useState } from "react";
import "./styles.css";

import { unified } from "unified";
import remarkStringify from "remark-stringify";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";

import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import rehypeSanitize from "rehype-sanitize";

const HTMLtoMDCompiler = unified()
  .use(rehypeParse)
  .use(rehypeRemark)
  .use(remarkStringify, {
    bullet: "*",
    fence: "~",
    fences: true,
    incrementListMarker: false
  });

const MDtoHTMLCompiler = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

export default function App() {
  const [txt, setTxt] = useState("");
  const [result, setResult] = useState("");
  const [resultMD, setResultMD] = useState("");
  useEffect(() => {
    console.log(HTMLtoMDCompiler.parse(txt));
    setResult(HTMLtoMDCompiler.processSync(txt)?.value || "");
  }, [txt]);

  useEffect(() => {
    setResultMD(MDtoHTMLCompiler.processSync(result)?.value || "");
  }, [result]);

  return (
    <div className="App" style={{ display: "flex" }}>
      <div>
        <textarea
          row={10}
          onChange={(e) => setTxt(e.target.value)}
          value={txt}
        />
      </div>
      <div>
        <pre style={{ marginLeft: "2rem" }}>{result}</pre>
      </div>
      <div>
        <pre style={{ marginLeft: "2rem" }}>{resultMD}</pre>
      </div>
    </div>
  );
}
