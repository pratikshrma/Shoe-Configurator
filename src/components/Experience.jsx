import React, { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, Float, ContactShadows, PresentationControls, Bvh } from '@react-three/drei'
import { useStore } from '../stores/global'
import { useThree } from '@react-three/fiber'

const ResponsiveModel = ({ children }) => {
    const { viewport } = useThree()
    const scale = useMemo(() => {
        return Math.min(viewport.width / 6, 1.311)
    }, [viewport.width])

    return <group scale={scale}>{children}</group>
}


const Experience = () => {
    const model = useGLTF('./shoe-draco.glb')
    const color = useStore(state => state.color)
    const selectedMaterialKey = useStore(state => state.selectedMaterialKey)
    const setSelectedMaterialKey = useStore(state => state.setSelectedMaterialKey)
    const setHoverMaterialKey = useStore(state => state.setHoverMaterialKey)

    useEffect(() => {
        if (!selectedMaterialKey) return
        model.materials[selectedMaterialKey].color.set(color)
    }, [color])


    const setMaterialKey = (e, key) => {
        e.stopPropagation()
        setSelectedMaterialKey(key)
    }

    const setHoverMaterialKeyHelper = (e, key) => {
        console.log("Hello from this side")
        e.stopPropagation()
        setHoverMaterialKey(key)
    }

    return (
        <>
            <PresentationControls
                global // controls the entire scene instead of a local group
                polar={[-0.4, 0.8]} // vertical rotation limits (up/down)
            >
                <ResponsiveModel>
                    <Float>
                        <group dispose={null} scale={[2, 2, 2]} onPointerOut={() => setHoverMaterialKey(null)}>
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "laces")} onPointerDown={(e) => setMaterialKey(e, "laces")} castShadow receiveShadow geometry={model.nodes.shoe.geometry} material={model.materials.laces} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "mesh")} onPointerDown={(e) => setMaterialKey(e, "mesh")} castShadow receiveShadow geometry={model.nodes.shoe_1.geometry} material={model.materials.mesh} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "caps")} onPointerDown={(e) => setMaterialKey(e, "caps")} castShadow receiveShadow geometry={model.nodes.shoe_2.geometry} material={model.materials.caps} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "inner")} onPointerDown={(e) => setMaterialKey(e, "inner")} castShadow receiveShadow geometry={model.nodes.shoe_3.geometry} material={model.materials.inner} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "sole")} onPointerDown={(e) => setMaterialKey(e, "sole")} castShadow receiveShadow geometry={model.nodes.shoe_4.geometry} material={model.materials.sole} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "stripes")} onPointerDown={(e) => setMaterialKey(e, "stripes")} castShadow receiveShadow geometry={model.nodes.shoe_5.geometry} material={model.materials.stripes} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "band")} onPointerDown={(e) => setMaterialKey(e, "band")} castShadow receiveShadow geometry={model.nodes.shoe_6.geometry} material={model.materials.band} />
                            <mesh onPointerEnter={e => setHoverMaterialKeyHelper(e, "patch")} onPointerDown={(e) => setMaterialKey(e, "patch")} castShadow receiveShadow geometry={model.nodes.shoe_7.geometry} material={model.materials.patch} />
                        </group>
                    </Float>
                </ResponsiveModel>
            </PresentationControls>
            <ContactShadows global opacity={1} scale={10} blur={8} far={10} position={[0, -2, 0]} resolution={256} color={'#dbc9c9'} />
        </>
    )
}

export default Experience