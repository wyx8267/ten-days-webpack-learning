### loader 组成

loader 默认由两部分组成： pitch normal
```
     //pitch 无返回值  
pitch   loader3 → loader2 → loader1  
                                    ↘ 
                                      资源
                                    ↙
normal   loader3 ← loader2 ← loader1 

    // pitch loader - 有返回值 
user: [loader3, loader2, loader1]
pitch   loader3 → loader2  loader1  
                     ↙               
               有返回值               资源
               ↙                      
normal  loader3  loader2  loader1
```
