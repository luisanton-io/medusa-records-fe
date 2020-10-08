import React, { useState } from 'react'
import { useTrail, animated } from 'react-spring'
import '../styles/MedusaHeader.scss'

const items = ['Medusa', 'Records']
const config = { mass: 10, tension: 1000, friction: 200 }

interface HeaderProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export default function MedusaHeader(props: HeaderProps) {
  const [toggle, set] = useState(true)
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })

  return (
    <div id='medusa-header'>
        <div className="trails-main">
            <div>
                {trail.map(({ x, height, ...rest }, index) => (
                    <animated.div
                    key={items[index]}
                    className="trails-text"
                    style={{ ...rest, 
                        // transform: x.interpolate(x => `translate3d(0,${x}px,0)`) 
                    }}>
                    <animated.div style={{ height }}>{items[index]}</animated.div>
                </animated.div>
                ))}
            </div>
        </div>
    </div>
  )
}