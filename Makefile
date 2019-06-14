help:
	@echo "---------------- HELP ---------------------"
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/\://'| sed -e 's/##//'
up:                    ## Sobe o ambiente via compose localmente
	docker-compose up --force-recreate --build
run:                   ## Executa a aplicação localmente
	npm start
setup:          ## Instala todas as dependências necessárias para rodar o projeto
	npm install
