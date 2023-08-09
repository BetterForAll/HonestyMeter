import { string, objectOf, number, shape, arrayOf } from 'prop-types';

export const suggestedChangesPropType = arrayOf(string);

export const manipulationPropType = shape({
    name: string,
    description: string,
    context: string,
    suggestedChanges: suggestedChangesPropType
});

export const manipulationsPropType = arrayOf(manipulationPropType);

export const sideScorePropType = {
    sideName: string,
    score: number
}

export const sidesScorePropType = arrayOf(shape(sideScorePropType));

export const sidesBalancePropType = objectOf(number);

const reportPropType = shape(
    {
        score: number,
        explanation: string,
        sidesScore: sidesScorePropType,
        sidesBalance: sidesBalancePropType,
        favoredSide: string,
        manipulations: manipulationsPropType
    }
)

export const sidesBalanceChartDataPropType = shape({
    labels: arrayOf(string),
    values: arrayOf(number)
})

export const sidesScoreChartDataPropType = shape({
    labels: arrayOf(string),
    datasets: arrayOf(shape(
        {
            label: string, data: arrayOf(number), backgroundColor: string
        }
    )
    )
})

export default reportPropType