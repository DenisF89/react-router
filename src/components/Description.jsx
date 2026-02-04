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