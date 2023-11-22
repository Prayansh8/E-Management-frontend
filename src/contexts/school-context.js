import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

export const SchoolContext = createContext({});

export const SchoolProvider = (props) => {
  const { children } = props;
  const [grades, setGrades] = useState([]);
  const [gradesQuickList, setGradesQuickList] = useState([]);
  const [gradesSectionsList, setGradesSectionsList] = useState([]);
  const [sectionsById, setSectionsById] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [showGloablLoader, setShowGloablLoader] = useState(false);

  const gradeIndexes = [
    [-2, "Pre School"],
    [-1, "Class KG 1"],
    [0, "Class KG 2"],
    [1, "Class 1"],
    [2, "Class 2"],
    [3, "Class 3"],
    [4, "Class 4"],
    [5, "Class 5"],
    [6, "Class 6"],
    [7, "Class 7"],
    [8, "Class 8"],
    [9, "Class 9"],
    [10, "Class 10"],
    [11, "Class 11"],
    [12, "Class 12"],
  ];

  const getGradeIndexToLabel = (index) => {
    const gradeLebel = gradeIndexes.find((gradeIndex) => index === gradeIndex[0]);
    return gradeLebel[1];
  };
  
  let gradeIndexToLabel = {};
  for (let index = 0; index < gradeIndexes.length; index++) {
    gradeIndexToLabel[gradeIndexes[index][0]] = gradeIndexes[index][1];
  }

  useEffect(() => {
    const byIds = {};
    for (let index = 0; index < gradesSectionsList.length; index++) {
      const section = gradesSectionsList[index];
      byIds[section.id] = section;
    }
    setSectionsById(byIds);
  }, [gradesSectionsList]);

  return (
    <SchoolContext.Provider
      value={{
        grades,
        teachers,
        gradeIndexes,
        sectionsById,
        gradesQuickList,
        showGloablLoader,
        gradeIndexToLabel,
        gradesSectionsList,
        setGrades,
        setTeachers,
        setGradesQuickList,
        setShowGloablLoader,
        getGradeIndexToLabel,
        setGradesSectionsList,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const SchoolConsumer = SchoolContext.Consumer;

export const useSchoolContext = () => useContext(SchoolContext);
