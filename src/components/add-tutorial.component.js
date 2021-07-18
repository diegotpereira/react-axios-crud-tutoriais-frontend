import React, { Component } from "react";

import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeDescricao = this.onChangeDescricao.bind(this);
        this.salvarTutorial = this.salvarTutorial.bind(this);
        this.novoTutorial = this.novoTutorial.bind(this);

        this.state = {
            id: null,
            titulo: "",
            descricao: "",
            published: false,
            submitted: false
        };
    }

    onChangeTitulo(e) {
        this.setState({
            titulo: e.target.value
        });
    }

    onChangeDescricao(e) {
        this.setState({
            descricao: e.target.value
        });
    }

    salvarTutorial(){
        var data = {
            titulo: this.state.titulo,
            descricao: this.state.descricao
        };

        TutorialDataService.create(data)
                       .then(response => {
                        this.setState({
                            id: response.data.id,
                            titulo: response.data.titulo,
                            descricao: response.data.descricao,
                            published: response.data.published,
                            submitted: true
                        });

                        console.log(response.data);
                    })

                    .catch(e => {
                        console.log(e);
                    });
    }

    novoTutorial() {
        this.setState({
            id: null,
            titulo: "",
            descricao: "",
            published: false,
        });
    }

    render() {

        return(
            <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.novoTutorial}>
              Novo
            </button>
          </div>
        ) : (
            <div>
              <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  required
                  value={this.state.titulo}
                  onChange={this.onChangeTitulo}
                  name="titulo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  required
                  value={this.state.descricao}
                  onChange={this.onChangeDescricao}
                  name="descricao"
                />
              </div>

              <button onClick={this.salvarTutorial} className="btn btn-success">
                Enviar
            </button>
            </div>
          )}
      </div>
        );
    }
}