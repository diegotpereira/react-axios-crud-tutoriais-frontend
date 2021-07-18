import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutoriaisLista extends Component {

    constructor(props) {
        super(props);
        this.onChangeBuscarTitulo = this.onChangeBuscarTitulo.bind(this);
        this.recuperarTutorial = this.recuperarTutorial.bind(this);
        this.refreshLista = this.refreshLista.bind(this);
        this.definirTutorialAtivo = this.definirTutorialAtivo.bind(this);
        this.removerTodosTutoriais = this.removerTodosTutoriais.bind(this);
        this.buscarTitulo = this.buscarTitulo.bind(this);
    
        this.state = {
          tutoriais: [],
          currentTutorial: null,
          currentIndex: -1,
          buscarTitulo: ""
        };
      }
    
      componentDidMount() {
        this.recuperarTutorial();
      }
    
      onChangeBuscarTitulo(e) {
        const buscarTitulo = e.target.value;
    
        this.setState({
          buscarTitulo: buscarTitulo
        });
      }
    
      recuperarTutorial() {
        TutorialDataService.getAll()
          .then(response => {
            this.setState({
              tutoriais: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      refreshLista() {
        this.recuperarTutorial();
        this.setState({
          currentTutorial: null,
          currentIndex: -1
        });
      }
    
      definirTutorialAtivo(tutorial, index) {
        this.setState({
          currentTutorial: tutorial,
          currentIndex: index
        });
      }
    
      removerTodosTutoriais() {
        TutorialDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshLista();
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      buscarTitulo() {
        this.setState({
          currentTutorial: null,
          currentIndex: -1
        });


        TutorialDataService.findByTitulo(this.state.buscarTitulo)
          .then(response => {
            this.setState({
              tutoriais: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { buscarTitulo, tutoriais, currentTutorial, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar Titulo..."
                  value={buscarTitulo}
                  onChange={this.onChangeBuscarTitulo}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button" 
                    onClick={this.buscarTitulo}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Lista de Tutoriais</h4>
    
              <ul className="list-group">
                {tutoriais &&
                  tutoriais.map((tutorial, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.definirTutorialAtivo(tutorial, index)}
                      key={index}
                    >
                      {tutorial.titulo}
                    </li>
                  ))}
              </ul>
    
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removerTodosTutoriais}
              >
                Excluir Todos

              </button>
            </div>
            <div className="col-md-6">
              {currentTutorial ? (
                <div>
                  <h4>Tutorial</h4>
                  <div>
                    <label>
                      <strong>Titulo:</strong>
                    </label>{" "}
                    {currentTutorial.titulo}
                  </div>
                  <div>
                    <label>
                      <strong>Descrição:</strong>
                    </label>{" "}
                    {currentTutorial.descricao}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>
    
                  <Link
                    to={"/tutoriais/" + currentTutorial.id}
                    className="badge badge-warning"
                  >
                    Edit
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Clique em um tutorial...</p>
                </div>
              )}
            </div>
          </div>

        );
    }    
     
}