import "react"   // loads the react package
import {MCQChallenge} from "../challenge/MCQChallenge.jsx"; //MCQ challenge is a component, history panel will render this later
import {useState, useEffect} from "react";
import {useApi} from "../utils/api.js";

export function HistoryPanel(){ // a function component, export to enable other files to import it
    const {makeRequest} = useApi()

    const [history, setHistory] = useState([]) //React state hooks, gives us a state variable and setter. history is an array of past challenges, by default its empty
    const [isLoading,setIsLoading] = useState(true) // flag for the data, while its loading, default is true
    const[error, setError] = useState(null) // for fetch failure, its a str or obj starts at null

    useEffect(() => { //useEffect runs after component first renders
        fetchHistory() // calls async weapper that pulls data and glip loading flags

    }, []) // [] run only onve,

    const fetchHistory = async() => {
        setIsLoading(true) //placeholder, just sets to false for now doesnt fetch any data
        setError(null)

        try {
            const data=await makeRequest("my-history")
            setHistory(data.challenges)
        } catch (err) {
            setError("Failed to load history")
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) { // depending on state variable we return different trees, depending on the state. so here this is displayed while its loading
        return <div className= "loading" > Loading history... </div>
    }

    if (error) { // this occurs when there is an error
        return <div className= "error-message">
            <p>{error}</p> 
            <button onClick={fetchHistory}> Retry</button> 
        </div>
    } //this is javascript expression, insert directly into DOM. e.g error may be "Network Error"  {error}
        //// renders a button element that says Retry. When button is clicked it runs the fetchHistory function

    // this occurs when isloading === false and error ===null, outer div is for styling
    return <div className="history-panel"> 
        <h2> History</h2>
        {history.length===0? <p> No challenge history</p> :// React conditionally renders diff element sbased on data state, here if there is no data we show there is no challenge history, othersise we show a list of challenge components
        // // history is array of challenge objects, .maploops over each chanllenge in the array and returns one MCQ challenge component per item
            <div className="history-list"> 
                {history.map((challenge) => {
                    return <MCQChallenge // we are returning a react component instance here
                        challenge={challenge} // passes the whole challenge object into the MCQChallenge component
                        key={challenge.id} // react requirement for lists, it gelps reack track which iten changed,added or removed
                        showExplanation //boolean prop. e.g showExplanation={true} equivalent, this makes the component auto-display answers
                        />


                })}
            </div>

        }
    </div>
    
}