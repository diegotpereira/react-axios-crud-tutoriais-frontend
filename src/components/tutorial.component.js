import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class Tutorial extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.atualizarTutorial = this.atualizarTutorial.bind(this);
        this.deletarTutorial = this.deletarTutorial.bind(this);
    
        this.state = {
          currentTutorial: {
            id: null,
            titulo: "",
            descricao: "",
            published: false
          },
          message: ""
        };
      }
    
      componentDidMount() {
        this.getTutorial(this.props.match.params.id);
      }
    
      onChangeTitulo(e) {
        const titulo = e.target.value;
    
        this.setState(function(prevState) {
          return {
            currentTutorial: {
              ...prevState.currentTutorial,
              titulo: titulo
            }
          };
        });
      }
    
      onChangeDescricao(e) {
        const descricao = e.target.value;
        
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            descricao: descricao
          }
        }));
      }
    
      getTutorial(id) {
        TutorialDataService.get(id)
          .then(response => {
            this.setState({
              currentTutorial: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      updatePublished(status) {
        var data = {
          id: this.state.currentTutorial.id,
          titulo: this.state.currentTutorial.titulo,
          descricao: this.state.currentTutorial.descricao,
          published: status
        };
    
        TutorialDataService.update(this.state.currentTutorial.id, data)
          .then(response => {
            this.setState(prevState => ({
              currentTutorial: {
                ...prevState.currentTutorial,
                published: status
              }
            }));
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      atualizarTutorial() {
        TutorialDataService.update(
          this.state.currentTutorial.id,
          this.state.currentTutorial
        )
          .then(response => {
            console.log(response.data);
            this.setState({
              message: "O tutorial foi atualizado com sucesso!"
            });
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      deletarTutorial() {    
        TutorialDataService.delete(this.state.currentTutorial.id)
          .then(response => {
            console.log(response.data);
            this.props.history.push('/tutoriais')
          })
          .catch(e => {
            console.log(e);
          });
      }

      render() {
        const { currentTutorial } = this.state;
    
        return (
          <div>
            {currentTutorial ? (
              <div className="edit-form">
                <h4>Tutorial</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="titulo"
                      value={currentTutorial.titulo}
                      onChange={this.onChangeTitulo}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <input
                      type="text"
                      className="form-control"
                      id="descricao"
                      value={currentTutorial.descricao}
                      onChange={this.onChangeDescricao}
                    />
                  </div>
    
                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentTutorial.published ? "Published" : "Pending"}
                  </div>
                </form>
    
                {currentTutorial.published ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(false)}
                  >
                    Cancelar Publicação
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => this.updatePublished(true)}
                  >
                    Publicação
                  </button>
                )}
    
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deletarTutorial}
                >
                  Delete
                </button>
    
                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={this.atualizarTutorial}
                >
                  Update
                </button>
                <p>{this.state.message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Clique em um tutorial...</p>
              </div>
            )}
          </div>
        );
      }
    
}