import {useEffect, useRef, useState} from "react";
import css from './Uploading.module.css';
import sleepyPandaImg from './sleepy_panda_img.png';
import awakePandaImg from './awake_panda_img.png';
import uploadingComplete from './progress_bar_ready_img.png';
import Header from "../../components/header/Header.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import Footer from "../../components/footer/Footer.jsx";
import StudworkService from "../../services/studwork/StudworkService.js";

export default function Uploading() {
    const [uploadingProgress, setUploadingProgress] = useState(0);
    const progressWheel = useRef(null);

    const [resultId, setResultId] = useState('');
    const [resultFingerprint, setResultFingerprint] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const onProgressUpdate = (uploadingPercents) => {
        setUploadingProgress(uploadingPercents);
        progressWheel.current.style.background = `conic-gradient(blue ${(uploadingPercents) * 3.6}deg, white 0deg)`;
    };

    const onProgressComplete = (id, fingerprint) => {
        setResultId(id);
        setResultFingerprint(fingerprint);
    };

    useEffect(() => {
        if(location.state.file)
            StudworkService.upload(location.state.file, onProgressUpdate, onProgressComplete);
        else
            console.log('Не смог обнаружить файл');
    }, []);

    // let timer;
    // const updateCount = () => {
    //     timer = setInterval(() => {
    //         progressWheel.current.style.background = `conic-gradient(blue ${(uploadingProgress + 1) * 3.6}deg, white 0deg)`;
    //         // console.log(progressWheel.current);
    //         // progressTitle.current.textContent = `Ожидание${'.'.repeat(uploadingProgress % 3)}`;
    //         setUploadingProgress(prevCount => prevCount + 1);
    //     }, 10)
    //
    //     if (uploadingProgress === 100) {
    //         clearInterval(timer);
    //     }
    // }
    // useEffect(() => {
    //     updateCount();
    //     return () => clearInterval(timer);
    // }, [uploadingProgress]);

    const onSeeResultsClick = () => {
        navigate(`/result?resultId=${resultId}&fingerprint=${resultFingerprint}`);
    };

    return (
        <div>
            <Header/>
            {uploadingProgress === 100 ?
                <div>
                    <div className={css.content}>
                        <p/>
                        <div className={css.uploadingProgress}>
                            <div className={css.uploadingProgress__finishBanner}>
                                <img className={css.uploadingProgress__uploadingCompleteImg} src={uploadingComplete}
                                     alt={'Uploading complete'}/>
                                <p className={css.uploadingProgress__text}>Проверка окончена!</p>
                            </div>
                            <button
                                className={`${css.button} ${css.button_results} ${css.button_red} ${css.button_shadow}`}
                                onClick={onSeeResultsClick}>ПОСМОТРЕТЬ
                                РЕЗУЛЬТАТ
                            </button>
                            <img className={css.uploadingProgress__mascot} src={awakePandaImg}/>
                        </div>
                    </div>
                </div>
                :
                <div className={css.content}>
                    <div className={css.uploadingProgress}>
                        <div className={css.uploadingProgress__wheel} ref={progressWheel}>
                            <p className={css.uploadingProgress__indicator}>{`${uploadingProgress}%`}</p>
                        </div>
                        <p className={css.uploadingProgress__text}>Ожидание...</p>
                        <img className={css.uploadingProgress__mascot} src={sleepyPandaImg}/>
                    </div>
                </div>
            }
            <Footer/>
        </div>
    );
}