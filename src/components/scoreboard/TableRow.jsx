import React, { Component } from "react";
import ProblemBox from "./ProblemBox";
import "./TableRow.css";

import defaultImage from "../../assets/university_logos/default.png";
import i7736 from "../../assets/university_logos/7736.jpg";
import i348 from "../../assets/university_logos/348.jpg";
import i46003 from "../../assets/university_logos/46003.jpg";
import i15763 from "../../assets/university_logos/15763.jpg";
import i6106 from "../../assets/university_logos/6106.jpg";
import i13884 from "../../assets/university_logos/13884.jpg";
import i53286 from "../../assets/university_logos/53286.jpg";
import i9582 from "../../assets/university_logos/9582.jpg";
import i111545 from "../../assets/university_logos/111545.jpg";
import i44295 from "../../assets/university_logos/44295.jpg";
import i15433 from "../../assets/university_logos/15433.jpg";
import i441 from "../../assets/university_logos/441.jpg";
import i29344 from "../../assets/university_logos/29344.jpg";
import i12112 from "../../assets/university_logos/12112.jpg";
import i11579 from "../../assets/university_logos/11579.jpg";
import i10289 from "../../assets/university_logos/10289.jpg";
import i29035 from "../../assets/university_logos/29035.jpg";
import i31485 from "../../assets/university_logos/31485.jpg";
import i436 from "../../assets/university_logos/436.jpg";
let images = {
i7736,
i348,
i46003,
i15763,
i6106,
i13884,
i53286,
i9582,
i111545,
i44295,
i15433,
i441,
i29344,
i12112,
i11579,
i10289,
i29035,
i31485,
i436,
};

class TableRow extends Component {
  timeSubmittedToNiceTime(timeSubmitted) {
    let seconds = timeSubmitted % 60;
    let minutes = Math.floor(timeSubmitted / 60);
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let niceTime = "";
    if (hours != 0) {
      niceTime += hours.toString().padStart(2, "0") + ":";
    }
    niceTime += minutes.toString().padStart(2, "0") + ":";
    niceTime += seconds.toString().padStart(2, "0");
    return niceTime;
  }

  getImageForTeam(url) {
    return images["i" + url] ?? defaultImage;
  }

  numberOfTriesOnAcceptedProblem(problemLetter) {
    let team = this.props.team;
    // return problemLetter + " - ";
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        return problemLetter + " - " + (team.triesOnProblems[i] + 1);
      }
    }
    return problemLetter;
  }

  numberOfTriesOnTriedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        return problemLetter + " - " + team.triesOnProblems[i];
      }
    }
    return problemLetter;
  }

  numberOfTriesOnFrozenProblem(problemLetter) {
    let team = this.props.team;
    let submissionWhenFrozen = this.props.submissionWhenFrozen;
    if (
      submissionWhenFrozen === undefined ||
      submissionWhenFrozen === null ||
      submissionWhenFrozen.length === 0
    ) {
      return problemLetter;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return problemLetter;
        }
        for (let j = 0; j < submissionWhenFrozen.length; j++) {
          if (
            submissionWhenFrozen[j].contestantName === team.name &&
            submissionWhenFrozen[j].problemIndex === problemLetter
          ) {
            return team.triesOnProblems[i] + 1 + " - " + this.timeSubmittedToNiceTime(submissionWhenFrozen[j].timeSubmitted);
          }
        }
      }
    }
    return problemLetter;
  }

  hasSolvedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  hasTriedProblem(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.triesOnProblems[i] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  isFirstToSolve(problemLetter) {
    let team = this.props.team;
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isFirstToSolve[i] !== 0) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  isAPendingProblem(problemLetter) {
    let team = this.props.team;
    let submissionWhenFrozen = this.props.submissionWhenFrozen;
    if (submissionWhenFrozen === undefined || submissionWhenFrozen.length === 0) {
      return false;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return false;
        }
        for (let j = 0; j < submissionWhenFrozen.length; j++) {
          if (
            submissionWhenFrozen[j].contestantName === team.name &&
            submissionWhenFrozen[j].problemIndex === problemLetter
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isAPendingProblemOnThisRow(problemLetter) {
    let team = this.props.team;
    let savedCurrentFrozenSubmission = this.props.savedCurrentFrozenSubmission;
    if (
      savedCurrentFrozenSubmission === undefined ||
      savedCurrentFrozenSubmission === null ||
      savedCurrentFrozenSubmission.length === 0
    ) {
      return false;
    }
    for (let i = 0; i < this.props.numberOfProblems; i++) {
      if (this.props.problems[i].index === problemLetter) {
        if (team.isProblemSolved[i] !== 0) {
          return false;
        }
        if (
          savedCurrentFrozenSubmission.contestantName === team.name &&
          savedCurrentFrozenSubmission.problemIndex === problemLetter
        ) {
          return true;
        }
      }
    }
    return false;
  }

  isACurrentFrozenProblem(problemLetter) {
    if (this.props.currentFrozenSubmission === null) {
      return false;
    }
    if (
      this.props.currentFrozenSubmission.contestantName === this.props.team.name &&
      problemLetter === this.props.currentFrozenSubmission.problemIndex
    ) {
      return true;
    }
    return false;
  }

  thisRowShhouldBeSelected(problems) {
    return (
      this.props.classNameForThisRow !== null &&
      this.props.classNameForThisRow !== undefined &&
      this.props.classNameForThisRow.length !== 0
    );
  }

  render() {
    let problems = this.props.problems;

    let sizeProblem = 84.0 / this.props.numberOfProblems;
    let widthPercentage = sizeProblem + "%";

    let problemColumns = problems.map(problem => {
      let verdict = "NoAttempted";
      let textToShowInProblem = problem.index;

      if (this.hasSolvedProblem(problem.index) === true) {
        if (this.isFirstToSolve(problem.index) === true) {
          verdict = "FirstAccepted";
        } else {
          verdict = "Accepted";
        }
        textToShowInProblem = this.numberOfTriesOnAcceptedProblem(problem.index);
      } else if (this.isACurrentFrozenProblem(problem.index) === true) {
        verdict = "Resolving";
        textToShowInProblem = this.numberOfTriesOnFrozenProblem(problem.index);
      } else if (this.isAPendingProblem(problem.index) === true) {
        verdict = "Pending";
        textToShowInProblem = this.numberOfTriesOnFrozenProblem(problem.index);
      } else if (this.hasTriedProblem(problem.index) === true) {
        verdict = "WrongAnswer";
        textToShowInProblem = this.numberOfTriesOnTriedProblem(problem.index);
      }

      return {
        key: problem.index,
        index: problem.index,
        width: widthPercentage,
        problemStatus: verdict,
        displayText: textToShowInProblem,
      };
    });

    let classNameForEachRow = "scoreboardTableGrayRow";
    if (this.thisRowShhouldBeSelected(problems) === true) {
      classNameForEachRow += this.props.classNameForThisRow;
    } else if (this.props.index % 2 !== 0) {
      classNameForEachRow = "scoreboardTableBlackRow";
    }

    return (
      <div className={"tableRow " + classNameForEachRow} id={this.props.team.id}>
        {/*Rank*/}
        <span className="tableRow-Rank">{this.props.team.position}</span>
        {/*Photo*/}
        <img className="tableRow-Picture" src={this.getImageForTeam(this.props.team.id)} alt="" />
        {/*Name+Problems*/}
        <div className="tableRow-TeamData">
          {/*ContestantName*/}
          <span className="tableRox-ContestantName">{this.props.team.name}</span>
          {/*Problem Boxes*/}
          <div className="tableRox-Problems">
            {problemColumns.map(problemData => {
              return <ProblemBox {...problemData} />;
            })}
          </div>
        </div>
        {/*ProblemsSolved*/}
        <span className="tableRow-ResolvedProblems">{this.props.team.solved}</span>
        {/*Penalty*/}
        <span className="tableRow-Penalty">{this.timeSubmittedToNiceTime(this.props.team.penalty)}</span>
      </div>
    );
  }
}

export default TableRow;
