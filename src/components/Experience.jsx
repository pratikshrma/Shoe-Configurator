import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, Float, ContactShadows, PresentationControls, Bvh, checkIfFrameIsEmpty } from '@react-three/drei'
import { useStore } from '../stores/global'
import { useFrame, useThree } from '@react-three/fiber'

const ResponsiveModel = ({ children }) => {
    const { viewport } = useThree()
    const scale = useMemo(() => {
        return Math.min(viewport.width / 6, 0.461)
    }, [viewport.width])

    return <group scale={scale}>{children}</group>
}


const Experience = () => {
    const model = useGLTF('./shoe-draco.glb')
    const color = useStore(state => state.color)
    const setColor = useStore(state => state.setColor)

    const shoeRef = useRef(null)
    const { camera, raycaster, pointer, children } = useThree()
    const selectedMaterialKey = useStore(state => state.selectedMaterialKey)
    const setSelectedMaterialKey = useStore(state => state.setSelectedMaterialKey)
    const setHoverMaterialKey = useStore(state => state.setHoverMaterialKey)

    useFrame(() => {
        raycaster.setFromCamera(pointer, camera)
        const hits = raycaster.intersectObjects([...shoeRef.current.children], false)
        if (hits.length)
            setHoverMaterialKey(hits[0].object.material.name)
        else
            setHoverMaterialKey(null)
    })

    useEffect(() => {
        if (!selectedMaterialKey) return
        model.materials[selectedMaterialKey].color.set(color)
    }, [color])


    const setMaterialKey = (e, key) => {
        e.stopPropagation()
        setSelectedMaterialKey(key)
        if (shoeRef.current)
            shoeRef.current.children.map(child => {
                if (child.material.name === key) {
                    console.log(child.material)
                    const color = child.material.color
                    const hexColorString = `#${color.getHexString()}`
                    setColor(hexColorString)
                }
            })

    }

    return (
        <>
            <PresentationControls
                global // controls the entire scene instead of a local group
                polar={[-0.4, 0.8]} // vertical rotation limits (up/down)
                speed={2.2}
            >
                <ResponsiveModel>
                    <Float>
                        <group ref={shoeRef} dispose={null} scale={[2, 2, 2]} onPointerOut={() => setHoverMaterialKey(null)}>
                            <mesh onPointerUp={(e) => setMaterialKey(e, "laces")} castShadow receiveShadow geometry={model.nodes.shoe.geometry} material={model.materials.laces} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "mesh")} castShadow receiveShadow geometry={model.nodes.shoe_1.geometry} material={model.materials.mesh} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "caps")} castShadow receiveShadow geometry={model.nodes.shoe_2.geometry} material={model.materials.caps} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "inner")} castShadow receiveShadow geometry={model.nodes.shoe_3.geometry} material={model.materials.inner} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "sole")} castShadow receiveShadow geometry={model.nodes.shoe_4.geometry} material={model.materials.sole} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "stripes")} castShadow receiveShadow geometry={model.nodes.shoe_5.geometry} material={model.materials.stripes} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "band")} castShadow receiveShadow geometry={model.nodes.shoe_6.geometry} material={model.materials.band} />
                            <mesh onPointerUp={(e) => setMaterialKey(e, "patch")} castShadow receiveShadow geometry={model.nodes.shoe_7.geometry} material={model.materials.patch} />
                        </group>
                    </Float>
                </ResponsiveModel>
            </PresentationControls>
            <ContactShadows global opacity={1} scale={10} blur={5} position={[0, -1.0, 0]} resolution={256} color={'#dbc9c9'} />
        </>
    )
}

export default Experience