import React, { useEffect, useRef, useState } from 'react'
import CalendarTodoModal from '../../components/calendar/CalendarTodoModal'
import Layout from '../../components/Layout'
import withAuthRequest from '../../hocs/withAuthRequest'
import styles from '../../styles/calendar/Calendar.module.css'
import { DateType } from '../../types'

function Calendar(){

    const today = new Date()
    const weekDays = ['일', '월', '화', '수', '목', '금', '토']

    const dateViewer = useRef<HTMLDivElement>(null)

    const [ days, setDays ] = useState<any[]>([])
    const [ recentMonth, setRecentMonth ] = useState<number>(0)
    const [ recentYear, setRecentYear ] = useState<number>(0)
    const [ isModalOn, setIsModalOn ] = useState<boolean>(false)
    const [ modalHeight, setModalHeight ] = useState<number>(0)

    const getFullDayOfThisMonth = (year: number, month: number) => {
        const lastDay = new Date(year, month, 0).getDay()
        const firstDay = new Date(year, month-1, 1).getDay()
        const fullDateOfLastMonth = new Date(year, month-1, 0).getDate()
        const fullDateOfThisMonth = new Date(year, month, 0).getDate()

        let dayArr: any[] = []
        for(let i=firstDay; i>0; i--){
            dayArr.push({ disable: true, day: fullDateOfLastMonth - i})
        }
        for(let i=1; i<=fullDateOfThisMonth; i++){
            dayArr.push({ disable: false, day: i})
        }
        for(let i=1; i<=6-lastDay; i++){
            dayArr.push({ disable: true, day: i})
        }

        setDays(dayArr)
    }

    const onClickArrowLeft = () => {
        if(recentMonth===1){
            getFullDayOfThisMonth(recentYear - 1, 12)
            setRecentMonth(12)
            setRecentYear(recentYear => recentYear - 1)
        } else {    
            getFullDayOfThisMonth(recentYear, recentMonth - 1)
            setRecentMonth(recentMonth => recentMonth - 1)
        }
    }

    const onClickArrowRight = () => {
        if(recentMonth===12){
            getFullDayOfThisMonth(recentYear + 1, 1)
            setRecentMonth(1)
            setRecentYear(recentYear => recentYear + 1)
        } else {    
            getFullDayOfThisMonth(recentYear, recentMonth + 1)
            setRecentMonth(recentMonth => recentMonth + 1)
        }
    }

    const onClickDay = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, day: number) => {
        console.log(e.clientX, e.clientY)
        setIsModalOn(true)
    }

    const onClickModalDisable = () => {
        setIsModalOn(false)
    }

    useEffect(() => {
        getFullDayOfThisMonth(today.getFullYear(), today.getMonth() + 1)
        setRecentMonth(today.getMonth() + 1)
        setRecentYear(today.getFullYear())
    }, [])

    useEffect(() => {
        if(dateViewer.current){
            setModalHeight(dateViewer.current.clientHeight)
            
        }
    }, [dateViewer.current?.clientHeight])

    return(
        <Layout>
            <div className={styles.container}>
                <div className={styles.date_selecter}>
                    <div className={styles.arrow_left} onClick={onClickArrowLeft}/>
                    <div className={styles.selecter_content}>{recentYear}년 {recentMonth}월</div>
                    <div className={styles.arrow_right} onClick={onClickArrowRight}/>
                </div>
                <div className={styles.date_viewer} ref={dateViewer}>
                    {isModalOn && <CalendarTodoModal height={modalHeight} setIsModalOn={onClickModalDisable}/>}
                    {days.map((el: { day: number, disable: boolean }, index: number) => (
                        <div key={index} className={el.disable ? styles.date_content__disable : styles.date_content} onClick={(e) => onClickDay(e, el.day)}>
                            {el.day}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default withAuthRequest(Calendar)