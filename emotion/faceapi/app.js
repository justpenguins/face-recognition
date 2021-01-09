(async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    await faceapi.nets.ageGenderNet.loadFromUri('/models');
    
    const input = document.querySelector('img');
    const canvas = faceapi.createCanvasFromMedia(input);
    const detection = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceExpressions();
    const detectionsWithAgeAndGender = await faceapi.detectAllFaces(input).withFaceLandmarks().withAgeAndGender()
    // const labeledDescriptors = [
    //     new faceapi.LabeledFaceDescriptors(
    //       'obama',
    //       [descriptorObama1, descriptorObama2]
    //     ),
    //     new faceapi.LabeledFaceDescriptors(
    //       'trump',
    //       [descriptorTrump]
    //     )
    //   ]
      
    //   const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors)

    const dimensions = {
        width: input.width,
        height: input.height
    };

    const resizedDimensions = faceapi.resizeResults(detection, dimensions);

    document.body.append(canvas);

    faceapi.draw.drawDetections(canvas, resizedDimensions);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDimensions);
    faceapi.draw.drawFaceExpressions(canvas, resizedDimensions);
    
})();

console.log("Done!")