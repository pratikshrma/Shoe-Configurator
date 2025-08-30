import React, { useEffect, useState } from 'react'
import style from '../styles/CustomCursor.module.css'
import { useStore } from '../stores/global'
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const hoverMaterialKey = useStore(state => state.hoverMaterialKey)

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', updateMousePosition)
        return () => window.removeEventListener('mousemove', updateMousePosition)
    }, [])

    return (
        <div
            style={{
                position: 'fixed',
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                height: '25px',
                width: '25px'
            }}
        >
            <div className={style.cursorImageHolder}>
                <img src={'./cursor.png'} alt="" />
            </div>
            {hoverMaterialKey && <div className={style.hoverMaterialKey}>
                {hoverMaterialKey ? hoverMaterialKey === "mesh" ? "body" : hoverMaterialKey : ""}
            </div>}
        </div>
    )
}

export default CustomCursor