import React from 'react';
import { string } from 'prop-types';
import { Card, CardContent } from '../../ui/card';

const TEXTS = {
  favoredSide: 'Favored Side'
}

export default function FavoredSide({ favoredSide }) {
  return (
    <div className="mx-auto text-center">
      <h3 className="text-lg font-semibold mb-4">
        {TEXTS.favoredSide}
      </h3>
      <Card className="bg-indigo-500/75 border-none">
        <CardContent className="p-4">
          <p className="text-white text-center">
            {favoredSide}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

FavoredSide.propTypes = {
  favoredSide: string
}
