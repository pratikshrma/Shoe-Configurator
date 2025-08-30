import style from './styles/App.module.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import Lights from './components/Lights'
import { useStore } from './stores/global'
import UI from './components/UI'
import CustomCursor from './components/CustomCursor'
import { Leva } from 'leva'

const App = () => {
    const selectedMaterialKey = useStore(state => state.selectedMaterialKey)

    return (
        <div>
            <Leva hidden />
            <div className={style.CustomCursorHolder}>
                <CustomCursor />
            </div>
            <div className={style.Heading}>
                Shoe Configurator
            </div>
            {
                selectedMaterialKey &&
                <div className={style.UIHolder}>
                    <UI />
                </div>
            }
            <div className={style.canvasHolder}>
                <Canvas camera={{ position: [0, 0, 4], fov: 45 }} shadows>
                    <color args={["#eed8d8"]} attach={'background'} />
                    <Lights />
                    <Experience />
                </Canvas>
            </div>
        </div >
    )
}

export default App