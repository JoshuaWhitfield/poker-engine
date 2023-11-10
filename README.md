# poker-engine
This is a poker engine built using a combination of Object Oriented Programming and Functional Programming in the Javascript language with Node.js

The code for this project is located in the '<b>master</b>' branch.

Abilities: 
  - create a river of cards
  - create multiple hole cards
  - determine the hand strength of multiple hands
  - determine the winning hand out of multiple hands
  - parse all results into string form


Components and Structure:
  The structure and direction of the engine's classes resemble a tree structure. 
  Higher-level or more abstracted classes are the parent of the least abstracted classes. 
  The engine class represents the root node and is the main class. Everything that the engine class uses is a child class.
  The controller class compiles all of the child classes that it can access and uses them in functions that the engine class can access.
  The deeper into the tree you traverse, the functions of the child classes get more specific.
  -- diagram: 
                                          engine
                                            ||
                                        controller
                                         (+ util)
                                            ||
                            ----------------------------------
                            ||              ||              ||
                          cache            deck         hand-ranking
                                         (+ util)
                                            ||
                                --------------------------
                                ||          ||          ||
                               river       card        hole

              
                                    
  
