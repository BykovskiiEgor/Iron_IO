import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {useAlert} from 'react-alert';
import SessionKeyModal from "../components/sessionKeyModal/SessionKeyModal";
import {useDispatch} from "react-redux";
import {Page, setGameId, setPage, setProfileData, setUserRole, UserRole} from "../../../store/slices/appStateSlice";
import { v4 as uuidv4 } from 'uuid';
import {type} from "os";
import Logo from '../../../components/logo/Logo';
import "./index.css";
import WinModal from '../../game/components/modal/WinModal';

const Auth = () => {

    const {control, getValues, formState: {isValid, errors}, trigger} = useForm({
        mode: "onChange", defaultValues: {
            nickname: ""
        }
    });
    const alert = useAlert();

    const dispatch = useDispatch();

    const sessionKeyModalRef = useRef(null);
    const winModalRef = useRef(null);

    useEffect(() => {    
        trigger();
    }, []);

    const play = useCallback(() => {
        if (!isValid) {
            alert.show(errors[Object.keys(errors)[0]]['message'])
        } else {
            sessionKeyModalRef.current.open();
        }
    }, [isValid, errors]);

    const createSession = useCallback(() => {
        if (!isValid) {
            alert.show(errors[Object.keys(errors)[0]]['message'])
        } else {
            updateProfileData();
            dispatch(setPage(Page.GAME));
            dispatch(setUserRole(UserRole.CREATOR));

            const id = Math.floor(Math.random() * (1_000_000 - 100_000 + 1) + 100_000);
            dispatch(setGameId(id.toString()));
        }
    },[isValid, errors]);

    const updateProfileData = useCallback(() => {
        dispatch(setProfileData(
            {
                name: getValues("nickname"),
                id: uuidv4()
            }
        ));
    }, []);

    return (
        <div className='auth_container'>
             <WinModal ref={winModalRef}/>
            <Logo/>
            <form className='auth'>
                <Controller
                    control={control}
                    name={"nickname"}
                    render={({field}) => <input placeholder='NICKNAME' {...field}/>}
                    rules={{
                        validate: {
                            isNotBlank: v => v && v.trim() !== "" || "Enter nickname",
                            minLength: v => v.trim().length >= 2 || "Min length 2",
                            maxLength: v => v.trim().length <=10 || "Max length 10"
                        }
                    }}
                />
                <div className='buttons'>
                    <button className='buttonsplay' type={"button"} onClick={play}>PLAY</button>
                    <button className='buttonscreate' type={"button"} onClick={createSession}>CREATE SESSION</button>
                </div>
                
            </form>
            <SessionKeyModal updateProfileData={updateProfileData} ref={sessionKeyModalRef}/>
        </div>
    );
};

export default Auth;