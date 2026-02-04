const Stars = ({value})=>{

        const white = Math.round(value);

        return(
            Array.from({ length:5},(_,i) => 
            <span   key={i}
                    className={"rating "+(i < white ?"yellow":"")}>
                        {i < white ? "★" : "☆"}
            </span>
            )
        ) 
        
}


export default Stars; 