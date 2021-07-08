import './Card.scss';

const Card = props => (
    <div className="card">
        <div className="card-header">
            <h1 className="text-center">{ props.title }</h1>
        </div>
        <div className="card-body">
            <p>{ props.content }</p>
        </div>
    </div>
);

export default Card;