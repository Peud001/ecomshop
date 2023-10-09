import { useState, useEffect } from "react"

const BackToTop = () => {

    const [backToTop, setBackToTop] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 700){
                setBackToTop(true)
            }else{
                setBackToTop(false)
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        })
    }

    return(
        <div>
            {
                backToTop && <button 
                onClick={scrollUp}
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '40px',
                    height : '30px',
                    width: '30px',
                    fontSize: '30px',
                    border: 'none',
                    background: '#cdc7b7',
                    borderRadius: '10px',
                    color : '#f68b1e'
                }} 
                >^</button>
            }
        </div>
    )
}
export default BackToTop