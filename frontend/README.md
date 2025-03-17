| angular                    | react                      | vue                        | comment                                                       |
| -------------------------- | -------------------------- | -------------------------- | ------------------------------------------------------------- |
| ngModule                   | useState                   | v-module \| ref            | 值绑定, angular vue 支持双向绑定，react 只能通过 event 来改变 |
| ngOnInit                   | useEffect                  | beforeMount \| mounted     | component init                                                |
| ngOnViewInit               | useLayoutEffect            |                            | component view init                                           |
| ngOnContentInit            | useLayoutEffect            |                            | component content init                                        |
| ngDestroy                  | useEffect 返回 的 function |                            | component destroy                                             |
| @Input \| @Output          | props: 参数 和 function    | definedProps\|setup(props) | father component send value to child or call father function  |
| Service Provider \| inject | new 实现 \| useContext     | provider \| inject         | service or provider, react use function,                      |
