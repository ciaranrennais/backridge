import CounterModel from "~~/server/models/Counter.model";

export default async function getNextSequence(name) {
    var ret = await CounterModel.findOneAndUpdate({ entity: name }, { $inc: { seqNumber: 1 } });
    return ret.seqNumber;
}
