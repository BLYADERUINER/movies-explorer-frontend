import './Section.css';

function Section({ name }) {
  return(
    <div className='section'>
      <h3 className='section__name'>{ name }</h3>
    </div>
  )
}

export default Section;
