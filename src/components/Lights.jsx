import React from 'react'
import { useControls } from 'leva'

const Lights = () => {
    const { position } = useControls({
        position: { value: { x: -1.41, y: 6.53, z: 2.54 }, step: 0.01 }
    })

    return (
        <>
            <ambientLight color={'#ffffff'} />
            <directionalLight position={[position.x, position.y, position.z]} color={'#ffffff'} castShadow shadow-bias={-0.005} />
        </>
    )
}

export default Lights