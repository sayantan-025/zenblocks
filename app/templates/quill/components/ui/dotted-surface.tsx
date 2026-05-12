"use client"
import { cn } from "../../lib/utils"
import React, { useEffect, useRef } from "react"
import * as THREE from "three"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    particles: THREE.Points[]
    animationId: number
    count: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60

    // Scene setup
    const scene = new THREE.Scene()
    // Fog for depth effect - darker at far distance
    scene.fog = new THREE.FogExp2(0x000000, 0.0008)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const particles: THREE.Points[] = []
    const positions: number[] = []
    const colors: number[] = []

    // Create geometry for all particles
    const geometry = new THREE.BufferGeometry()

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        const y = 0 // Will be animated
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

        positions.push(x, y, z)
        // Light gray dots for visibility against dark background
        colors.push(150, 150, 150)
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    )
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    // Create material
    const material = new THREE.PointsMaterial({
      size: 10,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    // Create points object
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let count = 0
    let animationId: number = 0

    // Animation function
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const positionAttribute = geometry.attributes.position
      const positions = positionAttribute.array as Float32Array

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3

          // Animate Y position with sine waves
          positions[index + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50

          i++
        }
      }

      positionAttribute.needsUpdate = true

      renderer.render(scene, camera)
      count += 0.1
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: [points],
      animationId,
      count,
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach((m) => m.dispose())
            } else {
              object.material.dispose()
            }
          }
        })

        sceneRef.current.renderer.dispose()

        if (containerRef.current && sceneRef.current.renderer.domElement) {
          containerRef.current.removeChild(sceneRef.current.renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ zIndex: 0 }}
      {...props}
    />
  )
}