import React, {useEffect, useState} from "react";
import axios from "axios";

const Fibo = () => {
  const [index, setIndex] = useState('');
  const [indices, setIndices] = useState([])
  const [values, setValues] = useState({})

  useEffect(() => {
    axios.get('/api/fibo/indices')
      .then(result => setIndices(result.data))
      .catch(error => {
        setIndices([{"fibo_index": 1}, {"fibo_index": 2}, {"fibo_index": 3}, {"fibo_index": 4}, {"fibo_index": 5}])
        console.error(error)
      });
    axios.get('/api/fibo/values')
      .then(result => {
          if( result.data ) {
            setValues(result.data) 
          } else {
            throw new Error('Got Null answer');
          }
        })
      .catch(error => {
        setValues({"1": 1, "2": 1, "3": 2, "4": 3, "5":5});
        console.error(error)
      });
  }, []);

  const handleSubmit = (event) => {

    event.preventDefault();
    fetch(`/api/fibo/${index}`, {method: 'POST'})
      .then(() => {
      });
  }
  return (
    <>
      <section className="section pb-0">
        <div className="has-text-centered">
          <span className="title is-1">Fibonacci Sequence - v0.0.2</span>
        </div>
      </section>
      <section className="section pb-0">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="indexInput" className="label has-text-centered">Index of Fibonacci sequence to be
                  calculated</label>
                <input type="number" className="input" id="indexInput" placeholder="4" value={index}
                       onChange={(e) => setIndex(e.target.value)}/>
              </div>
              <div className="has-text-centered">
                <button disabled={!index} type="submit" className="button is-primary">Submit</button>
              </div>

            </form>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="columns">
          <div className="column">
            <div className="box has-text-centered">
              <span className="subtitle is-2">Indices seen</span>
              <p className="is-1">
              {indices.map(i => {
                return i.fibo_index
              }).join(', ')}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="box has-text-centered">
              <span className="subtitle is-2 ">Calculated Values</span>
              <div>
                {
                  Object.keys(values).map(key => {
                    return (
                      <div key={key}>
                        <span>Calculated {values[key]} for index {key}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>

    </>

  );
}

export default Fibo;