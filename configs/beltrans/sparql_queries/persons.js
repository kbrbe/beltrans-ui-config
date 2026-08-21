const perspectiveID = 'persons'
const manifestationsPerspectiveID = 'translations'

export const personProperties = `
    {
      ?id schema:name ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    #
    # ISNI
    #
    {
        ?id bf:identifiedBy ?isniEntity .

        ?isniEntity a bf:Isni ;
                    rdfs:label "ISNI" ;
                    rdf:value ?isni__prefLabel . 
      BIND(CONCAT("https://isni.org/", ?isni__prefLabel) AS ?isni__dataProviderUrl)
    }
    #
    # KBR
    #
    UNION
    {
        ?id bf:identifiedBy ?kbr__id .

        ?kbr__id a bf:Identifier ;
                    rdfs:label "KBR" ;
                    rdf:value ?kbr__prefLabel . 
      BIND(CONCAT("https://uurl.kbr.be/aut/", ?kbr__prefLabel) AS ?kbr__dataProviderUrl)
    }

    #
    # gender
    #
    UNION
    {
      ?id schema:gender ?gender__id .
      ?gender__id rdfs:label ?gender__prefLabel .
      FILTER(LANG(?gender__prefLabel) = 'en')
    }
    #
    # nationality
    #
    UNION
    {
      ?id schema:nationality ?nationality__id .
      ?nationality__id skos:prefLabel ?nationality__prefLabel .
      #FILTER(LANG(?gender) = 'en')
    }
    #
    # birthDate
    #
    UNION
    {
      ?id schema:birthDate ?birthDate .
    }
    #
    # deathDate
    #
    UNION
    {
      ?id schema:deathDate ?deathDate .
    }

    #
    # authorOf
    #
    UNION
    {
        ?authorOf__id marcrel:aut ?id ;
           dcterms:identifier ?mID ;
           schema:name ?authorOf__prefLabel .
      BIND(CONCAT("/${manifestationsPerspectiveID}/page/", REPLACE(STR(?mID), "^.*\\\\/(.+)", "$1")) AS ?authorOf__dataProviderUrl)
    }

    #
    # translatorOf
    #
    UNION
    {
        ?translatorOf__id marcrel:trl ?id ;
           dcterms:identifier ?mID ;
           schema:name ?translatorOf__prefLabel .
      BIND(CONCAT("/${manifestationsPerspectiveID}/page/", REPLACE(STR(?mID), "^.*\\\\/(.+)", "$1")) AS ?translatorOf__dataProviderUrl)
    }

    #
    # scenaristOf
    #
    UNION
    {
        ?scenaristOf__id marcrel:sce ?id ;
           dcterms:identifier ?mID ;
           schema:name ?scenaristOf__prefLabel .
      BIND(CONCAT("/${manifestationsPerspectiveID}/page/", REPLACE(STR(?mID), "^.*\\\\/(.+)", "$1")) AS ?scenaristOf__dataProviderUrl)
    }

    #
    # illustratorOf
    #
    UNION
    {
        ?illustratorOf__id marcrel:ill ?id ;
           dcterms:identifier ?mID ;
           schema:name ?illustratorOf__prefLabel .
      BIND(CONCAT("/${manifestationsPerspectiveID}/page/", REPLACE(STR(?mID), "^.*\\\\/(.+)", "$1")) AS ?illustratorOf__dataProviderUrl)
    }

    #
    # publishingDirectorOf
    #
    UNION
    {
        ?publishingDirectorOf__id marcrel:pbd ?id ;
           dcterms:identifier ?mID ;
           schema:name ?publishingDirectorOf__prefLabel .
      BIND(CONCAT("/${manifestationsPerspectiveID}/page/", REPLACE(STR(?mID), "^.*\\\\/(.+)", "$1")) AS ?publishingDirector__dataProviderUrl)
    }

    #
    # numberAuthorOf
    #
    UNION
    }
        ?id btm:numberAuthorOf ?numberAuthorOf .
    }

    #
    # numberTranslatorOf
    #
    UNION
    }
        ?id btm:numberTranslatorOf ?numberTranslatorOf .
    }

    #
    # numberIllustratorOf
    #
    UNION
    }
        ?id btm:numberIllustratorOf ?numberIllustratorOf .
    }

    #
    # numberEditorOf
    #
    UNION
    }
        ?id btm:numberEditorOf ?numberEditorOf .
    }

`


export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
