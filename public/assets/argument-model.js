"use strict";
// The original honest lattice, unchanged.
const TIERS=[
 {k:0,name:"THEOREM",sub:"classical · proved",y:474,color:"var(--teal-deep)"},
 {k:1,name:"REDUCTION",sub:"genuine · verified",y:352,color:"var(--gold-deep)"},
 {k:2,name:"FRAMING",sub:"author's synthesis",y:214,color:"var(--red-deep)"},
 {k:3,name:"ANALOGY",sub:"real · loose · flagged",y:84,color:"var(--faint)"}
];
const TIERMETA={0:{label:"theorem",note:"classical, proved",color:"var(--teal-deep)"},1:{label:"reduction",note:"genuine, verified",color:"var(--gold-deep)"},2:{label:"framing",note:"author's synthesis",color:"var(--red-deep)"},3:{label:"analogy",note:"real, loose, flagged",color:"var(--faint)"}};
const NODES=[
 {id:"T1",t:0,vol:"The Mirror",label:"Lawvere's fixed-point theorem",g:"In a cartesian closed category, a point-surjective φ : A → Bᴬ forces every α : B → B to have a fixed point. The theorem the whole collection rests on."},
 {id:"T2",t:0,vol:"The Diagonal",label:"Cantor's theorem",g:"No surjection A ↠ 2ᴬ. The contrapositive of Lawvere with the twist α = ¬."},
 {id:"T3",t:0,vol:"The Diagonal",label:"Gödel's first incompleteness",g:"Provability is strictly weaker than truth; the diagonal lemma builds a sentence asserting its own unprovability."},
 {id:"T4",t:0,vol:"The Diagonal",label:"Undecidability of halting",g:"No total halting-decider. The construction with α = swap on {halt, loop}."},
 {id:"T5",t:0,vol:"The Diagonal",label:"Kleene recursion / the Y-combinator",g:"In a reflexive object every map has a fixed point; at φ = id this is the Y-combinator. The positive direction — power."},
 {id:"T6",t:0,vol:"The Ascent",label:"Reflection strictly strengthens",g:"A consistent r.e. theory cannot prove its own reflection (Gödel 2), so R(T) = T + Rfn(T) is fixed-point-free."},
 {id:"T7",t:0,vol:"The Descent",label:"No first-order categoricity",g:"Löwenheim–Skolem: a first-order theory with an infinite model has models of every infinite cardinality — ℕ cannot be pinned down from inside."},
 {id:"T8",t:0,vol:"The Atlas",label:"Knaster–Tarski",g:"A monotone map on a complete lattice has a least fixed point. The order genus of fixed-point theorem."},
 {id:"I1",t:1,vol:"The Diagonal",label:"The construction is one",g:"Cantor, Gödel, Turing, and Y are all g(x) = α(φ(x)(x)) — verified instance by instance (the Atlas gives fourteen explicit categorical 4-tuples). A genuine reduction, not an analogy."},
 {id:"I2",t:1,vol:"The Atlas",label:"Recovery by enrichment",g:"Enrich the answer-space until the twist becomes monotone or continuous, and a cheaper genus returns the fixed point. The specific recoveries — Kripke's truth, denotational semantics — are theorems."},
 {id:"F1",t:2,vol:"The Atlas",label:"Three genera of fixed-point theorem",g:"Diagonal, order, and topological theorems share the schema 'richness + regularity ⟹ a fixed point.' A useful organizing taxonomy — not itself a single theorem."},
 {id:"F2",t:2,vol:"The Atlas",label:"The five walls",g:"Consistent systems escape the diagonal by stratify / restrict / discipline / weaken / tolerate. A taxonomy of the available denials."},
 {id:"F3",t:2,vol:"The Ascent",label:"“No roof”",g:"The reflection ladder never completes — incompleteness read as the diagonal one level up. Carried by the theorem that reflection is strict (T6)."},
 {id:"F4",t:2,vol:"The Descent",label:"“No floor”",g:"Grounding has no self-justifying base — the intended model recedes, read as the diagonal turned downward. Carried by Löwenheim–Skolem (T7)."},
 {id:"F5",t:2,vol:"The Mirror",label:"“Power and limit, one source”",g:"Both issue from the same fixed point; the only variable is whether α has a fixed point of its own. The collection's central synthesis."},
 {id:"F6",t:2,vol:"The Mirror",label:"“Five faces of one theorem”",g:"The five volumes — the diagonal, its extent, its power, and its two limits — are one theorem seen under five lights, held together by the keystone. The reading that binds the corpus."},
 {id:"F7",t:2,vol:"The Engine",label:"“Power is the diagonal read forwards”",g:"The same construction that bounds (no roof, no floor) builds: recursion from nothing, self-reproduction, and the meaning of recursion as a least fixed point. The collection's power aspect, set opposite its two limiting ones."},
 {id:"A1",t:3,vol:"The Atlas",label:"Echoes in physics, mind, society",g:"Reflexive markets, self-fulfilling prophecy, the Löbian obstacle in AI, self-modeling in physics — genuine resonances, several contested (e.g. Lucas–Penrose). Labeled analogy, never theorem."}
];
const MLAB={T1:"Lawvere",T2:"Cantor",T3:"Gödel I",T4:"Halting",T5:"Y-comb",T6:"Reflection",T7:"No categ.",T8:"K–Tarski",I1:"one constr.",I2:"recovery",F1:"three genera",F2:"five walls",F3:"no roof",F4:"no floor",F5:"one source",F6:"five faces",F7:"the engine",A1:"echoes"};
const EDGES=[
 ["T1","I1","proves"],["I1","T2","instantiates"],["I1","T3","instantiates"],["I1","T4","instantiates"],["I1","T5","instantiates"],
 ["T1","F1","frames"],["T8","I2","proves"],["T8","F1","frames"],["F1","I2","frames"],["T2","F2","frames"],["T3","F2","frames"],
 ["T6","F3","proves"],["T7","F4","proves"],["F3","F5","frames"],["F4","F5","frames"],["I1","F6","frames"],["F5","F6","frames"],
 ["T5","F7","proves"],["T8","F7","proves"],["F7","F5","frames"],
 ["I1","A1","analogizes"],["F5","A1","analogizes"]
];
const ORDER={0:["T2","T3","T4","T5","T8","T6","T7","T1"],1:["I1","I2"],2:["F1","F2","F7","F3","F4","F5","F6"],3:["A1"]};
