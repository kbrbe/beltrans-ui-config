const perspectiveID = 'publishers'

export const publisherProperties = `
    {
      ?id schema:name ?prefLabel__id .
      FILTER(lang(?prefLabel__id) = '')
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
    #
    # location
    #
    UNION
    {
      ?id schema:addressLocality ?location__id .
        ?location__id a schema:Place ;
                      rdfs:label ?locationName .
      OPTIONAL {
          ?location__id rdfs:comment ?locationCountry .
      }
      BIND(COALESCE(CONCAT(?locationName, ' (', ?locationCountry, ')'),?locationName) AS ?location__prefLabel)
    }
    #
    # country
    #
    UNION
    {
      ?id schema:addressLocality ?location__id .
        ?location__id a schema:Place ;
                      rdfs:comment ?country .
    }
    #
    # region
    #
    UNION
    {
      ?id schema:addressRegion ?region .
    }
    #
    # ISNI
    #
    UNION
    {
        ?id bf:identifiedBy ?isniEntity .

        ?isniEntity a bf:Identifier ;
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
