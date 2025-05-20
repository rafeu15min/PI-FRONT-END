import './Garage.css'

export default function Garage(props: any) {
    return(
        <div id='garage' style={ props.boolean ? { backgroundColor: '#20dfaf' } : { backgroundColor: '#df2050' } }>
            Vaga: {props.name}
        </div>
    )
}