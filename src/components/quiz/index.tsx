
import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
import './index.css';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Button from '@mui/material/Button';   
import { correctAnswer, wrongAnswer } from '../../utils/sound';
import { shuffleArray } from '../../utils/random';
import {useUsers} from '../../context/Users'
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from './../.././firebase/firebase';

interface QuizProps {
    questionIndex: number;
    dataSet: any;
    goto?: (url: string) => void;
}

const Quiz: React.FC<QuizProps> = ({ questionIndex, dataSet, goto }) => {
    const [shuffledOptions, setShuffledOptions] = useState([] as any);
    const [checked, setChecked] = useState([false, false, false, false]);
    const { getUsers, updateUser} = useUsers();
    const {user}: any = getUsers();
    let history = useHistory();

    useEffect(() => {
        // Shuffle the options array when the component mounts or when props.questionIndex changes
        const options = dataSet[questionIndex].options;
        const shuffled = shuffleArray(options);
        setShuffledOptions(shuffled);
    }, []);

    const handleChecked = (index: number) => {
        setChecked((prevChecked) => {
            const updatedChecked = prevChecked.map((item, i) => (i === index ? true : false));
            return updatedChecked;
        });
    };

    const createHisory = async (user: any, win: boolean) => {
        const date = new Date();
        await addDoc(collection(db, "tracker"), {
            id: user.id,
            quizId: dataSet[questionIndex].quizId,
            questionId: dataSet[questionIndex].id,
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

    const handleSubmit = () => {
        const selectedOptions = shuffledOptions.filter((item: any, index: number) => checked[index]);
        const [item] = selectedOptions;

        if (item.correct) {
            updateDoc(doc(db, "users", user.id), {
                points: user.points + 1,
            }).then(() => {
                // send current user with updated points to context
                const updatedUser = {...user, points: user.points + 1};
                updateUser(updatedUser);
                createHisory(updatedUser, item.correct);
                correctAnswer.play();
                goto && goto(dataSet[questionIndex].goto);
                if (dataSet[questionIndex].goto === '/dashboard') {
                    document.location.href = document.location.origin;
                }
            });
        } else {
            updateDoc(doc(db, "users", user.id), {
                attempts: user.attempts + 1,
            }).then(() => {
                const updatedUser = {...user, attempts: user.attempts + 1};
                updateUser(updatedUser);
                createHisory(updatedUser, item.correct);
                wrongAnswer.play();
            });
        }
    };

    return (
        <Grid container>
            <Typography sx={{ fontWeight:"bold", paddingLeft:3, paddingRight:3, paddingTop:2, paddingBottom: {lg:3,md:3,sm:0,xs:0}, lineHeight:1.1, textAlign:"justify", fontSize: {lg: 23,md: 23,sm: 13,xs: 13} }}>{dataSet[questionIndex].header}</Typography>
            <Divider/>
            <List>

                {shuffledOptions.map((opt: any, index : number) => 
                (
                    <ListItem sx={{paddingTop:{lg:4,md:4,sm:3,xs:3}, height:{lg:40,md:40,sm:40,xs:30}}} className="q-option" key={opt.id}>
                        <FormControlLabel sx={{fontSize:{lg:14,md:14,sm:10,xs:10}}} disableTypography control={
                            <Checkbox checked={checked[index]} onClick={() => handleChecked(index)} />
                        } label={opt.text} />
                    </ListItem>
                ))}
                <Divider sx={{marginTop:{lg:3,md:3,sm:1,xs:1}}}/>
                <Button className='right-align paddi-top-5' variant="outlined" onClick={handleSubmit}>Continuar</Button>
            </List>
        </Grid>
    );
};

export default Quiz;