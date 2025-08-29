import style from './styles/App.module.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import Lights from './components/Lights'
import { useStore } from './stores/global'
import UI from './components/UI'
import CustomCursor from './components/CustomCursor'

const App = () => {

    return (
        <div>
            <div className={style.CustomCursorHolder}>
                <CustomCursor />
            </div>
            <div className={style.UIHolder}>
                <UI />
            </div>
            <div className={style.canvasHolder}>
                <Canvas flat={true} shadows>
                    <color args={["#eed8d8"]} attach={'background'} />

                    <Lights />
                    <Experience />
                </Canvas>
            </div>
        </div>
    )
}

export default App