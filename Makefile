.PHONY: dev build test lint clean install

install:
	npm ci --ignore-scripts

dev:
	npm run dev

build:
	npm run build

test:
	npm test

lint:
	npm run lint

clean:
	rm -rf node_modules dist .next .turbo
