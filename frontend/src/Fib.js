import React, {useEffect, useState} from "react";
import {fetchIndices, fetchValues, postIndex} from "./services/fib-service";

const Fib = () => {

  const [indices, setIndices] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  /*useEffect(() => {
    const init = async () => {
        const seenIndices = await fetchIndices();
        setIndices(seenIndices);
        const seenValues = await fetchValues();
        setValues(seenValues);
    }
    init();
  }, []);*/

  const handleSubmit = (e) => {
    e.preventDefault();
    postIndex(index);
  }

  return (
    <div className="container-fluid">
      <div className="text-center">
        <h1>Fibonacci Sequence</h1>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="indexInput">Index</label>
                <input type="number" className="form-control" id="indexInput" aria-describedby="indexHelp"
                       placeholder="4" value={index} onChange={(e) => setIndex(e.target.value)}/>
                <small id="indexHelp" className="form-text text-muted">Fibonacci index to be calculated.</small>
              </div>
              <button disabled={!index} type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <h3>Indices Seen</h3>
            {indices.join(', ')}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <h3>Calculated Values</h3>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Fib;
