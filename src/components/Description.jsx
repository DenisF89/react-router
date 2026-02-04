//Componente che gestisce la lunghezza della descrizione del prodotto.
//se supera i 160 caratteri viene spezzata e inserito un bottone toggle che visualizza e nasconde il resto del testo

const Description = ({text,open,setOpen})=>{
    
        if(!text)return;
        
        return (<>
                <p className={`description ${open ? "d-open" : "d-closed"}`}>
                    {open ? text : text.slice(0, 160)}
                    {!open && text.length > 160 && "..."}
                </p>
                {text.length>160 && 
                    <button onClick={() => setOpen(!open)}>
                    {open ? "Close" : "More"}
                    </button>
                }
                </>
            ) 
}


export default Description;