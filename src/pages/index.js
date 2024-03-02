import * as React from "react"
import Header from "../components/Header"
import Navigator from "../components/Navigator"
import { useState } from "react"
import Results from "../components/Results"
import '../../node_modules/tw-elements-react/dist/css/tw-elements-react.min.css';

const IndexPage = () => {
  const [resultList, setResultList] = useState([]);
  return (
    <div className="min-h-screen w-full">
      <Header />
      <Navigator setResultList={setResultList} />
      <Results resultList={resultList} />
    </div>
  )
}

export default IndexPage

export const Head = () => <title>Space Explorer</title>
