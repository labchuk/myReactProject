import React,{Fragment, useEffect} from "react";
import classes from './QuizResults.module.css'
import LayoutHeader from "../../hoc/Layout/LayoutHeader/LayoutHeader";
import {connect} from 'react-redux'
import {fetchMyResults} from "../../store/actions/actionMyResults";
import {NavLink} from "react-router-dom";

const QuizResults = (props) => {
    const renderMyResults = () => {
        if (props.myResults){
            return props.myResults.map(result => {
                return (
                    <li key={result.id}>
                        <div className={classes.Result}>
                            <span className={classes.firstSpan}>Результат теста - <span className={classes.spanName}>{result.name}</span></span>
                            <span className={classes.dateMax}>{new Date(result.date).toLocaleString('eu', {
                                hour12: false,})}
                        </span>
                        </div>
                        <div className={classes.progress}>
                            <div className={classes.progress_bar} style={{width: `${result.result}%`}}>
                                <p>{result.result}%</p>
                            </div>
                        </div>
                        <span className={classes.dateMin}>{new Date(result.date).toLocaleString('eu', {
                            hour12: false,})}
                        </span>
                    </li>
                )
            })
        }else return

    }
    useEffect(()=>{
    props.fetchMyResults()
        console.log(props.myResults)
        return () => {
            console.log(props.myResults)
        }
    },[])
    return (
        <Fragment>
            <LayoutHeader
            title='Мої результати'/>
            <div className={classes.QuizResults}>
                {props.myResults ? <ul>{renderMyResults()}</ul> :
                <div className={classes.NoResults}>
                    <h1>Результатів поки що немає</h1>
                    <p>Проходь тести</p>
                </div>}
            </div>
        </Fragment>
    )
}

function mapStateToProps(state) {
    return {
    myResults: state.results.myResults
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchMyResults: () => dispatch(fetchMyResults())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizResults)