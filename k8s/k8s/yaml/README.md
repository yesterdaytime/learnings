# Yaml rule

    -: 数组的项
    >: 在string 结尾加上 \n
    -|: 保持string 结构，自动加\n
    ---: 分割不同的yaml文件

<details>
    <summary>1. String</summary>

    example:

        json: value
        yaml: 
            slim and flexible
            better for configuration
        paragraph: >
            Blank lines denote
            paragraph breaks
        content: |-
            Or we
            can auto
            convert line breaks
            to save space

    result:

        {
            "json": "value",
            "yaml": "slim and flexible better for configuration",
            "paragraph": "Blank lines denote\nparagraph breaks\n",
            "content": "Or we\ncan auto\nconvert line breaks\nto save space"
        }
</details>

<details>
    <summary>2. Object</summary>

    example: 
        
        selector:
            matchLabels:
                app: web
            empty:

    result:
        "selector": {
            "matchLabels": {
                "app": "web"
            }
            "empty": null
        }
</details>

<details>
    <summary>3. Array</summary>
    
    example: 

        json:
            - rigid
            - better for data interchange
        array:
            - null_value:
            - boolean: true
            - integer: 1
            - alias: &example aliases are like variables
            - alias: *example

    result:

    {
        "json": [
            "rigid",
            "better for data interchange"
        ],
        "array": [
            {
                "null_value": null
            },
            {
                "boolean": true
            },
            {
                "integer": 1
            },
            {
                "alias": "aliases are like variables"
            },
            {
                "alias": "aliases are like variables"
            }
        ]
    }
</details>

<details>
    <summary>4. alias</summary>
    
    example: 
        alias: &foo
            bar: baz
        alias_reuse: *foo 

    result:
        {
            "alias": {
                "bar": "baz"
            },
            "alias_reuse": {
                "bar": "baz"
            }
        }
</details>

# K8s Rule

<details>
    <summary> Basic Rule </summary>
    
    apiVersion: v1
    kind: type 
    metadata:
        name: uniq_name
        namespace: default
    spec:
        ...
</details>

<details>
    <summary>Deployment</summary>

    
</details>

<details>
    <summary></summary>
</details>

<details>
    <summary></summary>
</details>

<details>
    <summary></summary>
</details>