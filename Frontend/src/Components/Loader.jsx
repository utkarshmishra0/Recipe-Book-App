import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50" style={{
        background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.2))",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
     boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      }}>
      <div class="wrapper">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
</div>
    </div>
  )
}

export default Loader
