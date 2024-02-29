import React, { useState } from 'react'
import { Box, Collapse, Typography, styled } from '@mui/material'
import { ArrowDownCircle } from '../../assets/scss/icon';
import Syllabusdetail from "../../components/Syllabus/syllabusDetail";
import TrainingMaterialModal from './TrainingMaterialModal';
import { FolderSyllabusIcon, ConceptIcon, AssignmentIcon, GuideIcon } from "../../assets/scss/icon";
import TimeAllocation from '../shared/TimeAllocation';
const dropdown = {
  backgroundColor: '#2D3748',
  width: '1280px',
  color: 'white',
  textAlign: 'left',
  padding: '10px'
};
const days = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2px',

}
const dropdowncontentzero = {
  display: 'flex',
  width: '1280px',
  backgroundColor: '#fff',
  border: '1px solid',
  padding: '15px',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
const dropdowncontent = {
  display: 'flex',
  width: '1280px',
  backgroundColor: '#fff',
  border: '1px solid',
  padding: '15px',
  borderRadius: '0px 0px 10px 10px',
  justifyContent: 'space-between',
  flexDirection: 'column',
  marginBottom: '25px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
}
export default function OutlineTabContent() {
  const Title = styled(Typography)({
    height: '34px',
    fontWeight: 'bold',
    background: '#2D3748',
    color: 'white',
    borderRadius: '10px 10px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
  const [openState, setOpenState] = useState({});
  const [openTraining, setOpenTraining] = useState(false); // state for open modal
  const [modalData, setModalData] = useState([]); // state for getting data for the modal 
  const [selectedDay, setSelectedDay] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [syllabusID, setSyllabusID] = useState(null)
  const [buttonData, setButtonData] = useState([])//State for the origin data
  React.useEffect(() => {
    setButtonData([
      {
        id: "1",
        content: [
          {
            id: "1",
            title: ".Netfunction",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <ConceptIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: <AssignmentIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Pratical",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <GuideIcon />,
                TrainingMaterial: [
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
          {
            id: "2",
            title: "Operator",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <ConceptIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: <AssignmentIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <GuideIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        content: [
          {
            id: "3",
            title: "FlowConTrol",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <ConceptIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: <AssignmentIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <GuideIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
          {
            id: "4",
            title: "Basic OOP",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <ConceptIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: <AssignmentIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: <GuideIcon />,
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  }, [])
  //Update the origin data
  const updateButtonData = (dayIndex, unitID, newFile, syllabusID) => {
    setButtonData((prevButtonData) => {
      return prevButtonData.map((day) => {
        if (day.id === dayIndex) {
          return {
            ...day,
            content: day.content.map((unit) => {
              if (unit.id === unitID) {
                return {
                  ...unit,
                  datasyllabus: unit.datasyllabus.map((syllabus) => {
                    if (syllabus.id === syllabusID) {
                      return {
                        ...syllabus,
                        TrainingMaterial: [...syllabus.TrainingMaterial, newFile],
                      };
                    }
                    return syllabus;
                  }),
                };
              }
              return unit;
            }),
          };
        }
        return day;
      });
    });
  };

  //Delete the origin data
  const deleteMaterialButtonData = (dayIndex, unitID, index, syllabusID) => {
    setButtonData((prevButtonData) => {
      return prevButtonData.map((day) => {
        if (day.id === dayIndex) {
          return {
            ...day,
            content: day.content.map((unit) => {
              if (unit.id === unitID) {
                return {
                  ...unit,
                  datasyllabus: unit.datasyllabus.map((syllabus) => {
                    if (syllabus.id === syllabusID) {
                      const newTrainingMaterial = [...syllabus.TrainingMaterial];
                      newTrainingMaterial.splice(index, 1);
                      return {
                        ...syllabus,
                        TrainingMaterial: newTrainingMaterial,
                      };
                    }
                    return syllabus;
                  }),
                };
              }
              return unit;
            }),
          };
        }
        return day;
      });
    });
  };
  const OpenTrainingMaterialModal = (e) => {
    setOpenTraining(prev => !prev);
  }
  const handlePress = (dayIndex) => {
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [dayIndex]: !prevOpenState[dayIndex],
    }));

  };

  const handleUnitClick = (dayIndex, unitIndex, dayID) => {
    setSelectedDay(dayID)
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [dayIndex]: {
        ...(prevOpenState[dayIndex] || {}),
        [unitIndex]: !prevOpenState[dayIndex][unitIndex],
      },
    }));

  };
  const handleClose = () => {
    setOpenTraining(false)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Box style={{ height: '590px', overflow: 'auto', width: 'fit-content' }}>
        {buttonData.map((day, dayIndex) => (
          <Box key={dayIndex} sx={days}>
            <button style={dropdown} onClick={() => handlePress(dayIndex)}>
              Day {dayIndex + 1}
            </button>
            <Collapse in={openState[dayIndex]} sx={{ transition: 'height 0.3s ease' }} unmountOnExit>
              {day.content.map((unit, unitIndex) => (
                <Box key={unitIndex} onClick={() => (handleUnitClick(dayIndex, unitIndex, day.id), setUnitId(unit.id))}>
                  <Box sx={unitIndex === 0 ? dropdowncontentzero : dropdowncontent}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Box sx={{ display: 'flex', width: '20%', gap: '100px' }}>
                        <Box>Unit {unit.id}</Box>
                        <Box>{unit.title}</Box>
                      </Box>
                      <Box>
                        <ArrowDownCircle />
                      </Box>
                    </Box>
                    <Collapse in={openState[dayIndex]?.[unitIndex]}>

                      <Box sx={{ paddingLeft: '145px' }}>
                        <Syllabusdetail Material={OpenTrainingMaterialModal}
                          setModalData={setModalData}
                          selectedDay={selectedDay}
                          unitId={unitId}
                          unit={unit}
                          day={day}
                          setSyllabusID={setSyllabusID}
                          setUnitId={setUnitId}
                          setSelectedDay={setSelectedDay}
                          openTraining={openTraining} />
                      </Box>

                    </Collapse>
                  </Box>
                </Box>
              ))}

            </Collapse>
          </Box>
        ))}
        {/* The modal */}
        {openTraining && <TrainingMaterialModal modalData={modalData}
          selectedDay={selectedDay} unitId={unitId}
          setModalData={setModalData}
          updateButtonData={updateButtonData}
          deleteMaterialButtonData={deleteMaterialButtonData}
          syllabusID={syllabusID}
          openTraining={openTraining}
          handleClose={handleClose} />}
      </Box>
      <Box>
        <Box sx={{ width: '200px', height: '409px', borderRadius: '10px', border: '1px solid #cccc', marginLeft: 'auto' }}>
          <Title>Time Allocation</Title>
          <Box sx={{ height: '409px' }}>
            <TimeAllocation />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
