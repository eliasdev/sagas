
import React, { useEffect, useState } from 'react';
import './index.css';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { correctAnswer, wrongAnswer } from '../../utils/sound';
import { useHistory } from "react-router-dom";
import { shuffleArray } from '../../utils/random';
import {useUsers} from '../../context/Users'
import { doc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from './../.././firebase/firebase';

const QuizCategory = ( props: any ) => {

    const [shuffledOptions, setShuffledOptions] = useState([] as any);
    const { getUsers, updateUser} = useUsers();
    const {user}: any = getUsers();

    // useEffect to shuffleArray
    useEffect(() => {
        // Shuffle the options array when the component mounts or when props.questionIndex changes
        const options = props.data;
        const shuffled = shuffleArray(options);
        setShuffledOptions(shuffled);
    }, []);


    const [currentSlide, setCurrentSlide] = useState(0);
    let history = useHistory();

    const createHisory = async (user: any, win: boolean) => {
        const date = new Date();
        await addDoc(collection(db, "tracker"), {
            id: user.id,
            quizId: props.quizId,
            questionId: props.id,
            date: date,
            dateMonth: date.getMonth(),
            dateYear: date.getFullYear(),
            dateString: date.toDateString(),
            points: win ? 1 : 0,
            attempts: win ? 0 : 1,
        }).then((uRef) => {
            console.log("Document written with ID: ", uRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    };

    const handleSelection = ( nextStatement : boolean ) => {
        // If the user has selected the correct answer, move to the next slide
        console.log(user)
        if (nextStatement) {
            setCurrentSlide(currentSlide + 1);

            updateDoc(doc(db, "users", user.id), {
                points: user.points + 1,
            }).then(() => {
                const updatedUser = {...user, points: user.points + 1};
                updateUser(updatedUser);
                createHisory(updatedUser, true);
                correctAnswer.play();
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        } else {
            updateDoc(doc(db, "users", user.id), {
                attempts: user.attempts + 1,
            }).then(() => {
                const updatedUser = {...user, points: user.points + 1};
                updateUser(updatedUser);
                createHisory(updatedUser, false);
                wrongAnswer.play();
            }).catch((error) => {
                console.error("Error adding document: ", error);
            });
        }

        // If the user has reached the end of the quiz, redirect to the dashboard
        if (currentSlide === shuffledOptions.length - 1) {
            document.location.href = document.location.origin;
            return
        }
        return;
    };

    return (
        <div style={{position: 'relative', zIndex: 1}}>
            {shuffledOptions.map((statement: any, idx: number) => 
                (
                currentSlide === idx && <div key={`key-${idx}`}>
                    <Typography key={ "text-" + statement.id } sx={{ padding:{lg: 10,md: 5,sm: 5,xs: 5}, paddingTop:{lg: 12,md: 15,sm: 5,xs: 5}, lineHeight:1.7, textAlign:"justify", fontSize: {lg: 23,md: 23,sm: 18,xs: 18} }}>{statement.text}</Typography>
                    <Stack width={300} className="opt-stack" direction="row" spacing={2}>
                        <Button onClick={ () => handleSelection(statement.cat === "ley") } variant="contained">Ley</Button>
                        <Button onClick={ () => handleSelection(statement.cat === "teo") } variant="contained">Teoría</Button>
                        <Button onClick={ () => handleSelection(statement.cat === "hip") } variant="contained">Hipótesis</Button>  
                    </Stack>
                </div>
                ))}
        </div>
    );
};

export default QuizCategory;