import React from 'react'
import backgroundImage from '../assets/images/baking-cooking-ingredients-flour-eggs-600nw-1450879733.webp'


export default function LandingPage() {

  return (
    <>

      <main style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh"
    }}>
        
        <section style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: "50%",
            top: "40%",
            // transform: "translate(-40%, -30%)",
        }}>
            <h1 style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", 
              fontSize: "48px",
            }}>Welcome to Our <br></br> Oline Recipe</h1>

            <p style={{
               fontSize: "20px"
            }}>Here you can find a variety of recipes to bake and enjoy</p>

        </section>
      </main>
    </>
  )
}
