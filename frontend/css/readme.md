# CSS knowledge

## 1. basic css 
    
    1. selector
    
| style    |    example    | intro                                                                  |
| -------- | ------------  | -------                                                                |
| .        |               | class                                                                  |
| #        |                | id                                                                     |
| .A.B     |  <el class="A B"   | A and B in same element                                                |
| .A, .B   |  A \| B  | A and B                                                                |
| .A .B    |   A C B    | A include B, A is perent or ancestor of B                              |
| .A > .B  |   A B     | A is parent of B                                                       |        
| .A + .B  |   A \e B   | A is brother of B and B after A, can't have other els between a and B  |  
| .A ~ .B  |   A \e C \e B \e B  | A is brother of B and B after A, can have other els between A and B    | 
| [A='value']   |  el A='value'  | A attribute is value | 
| [A='']  | 