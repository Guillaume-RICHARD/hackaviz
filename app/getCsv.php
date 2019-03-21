<?php

namespace App;


class getCsv
{
    public function __construct() {}

    public function readFile($filename, $path = "data/") {
        $row = 0;
        if (($handle = fopen($path.$filename.".csv", "r")) !== FALSE) {
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                $num = count($data);
                if ($row === 0) {
                    for ($c=0; $c < $num; $c++) {
                        $header[] = $data[$c];
                    }
                } else {
                    for ($c=0; $c < $num; $c++) {
                        $infos[$row][] = $data[$c];
                    }
                }

                $row++;
            }
            fclose($handle);
        }

        return $data = [
            'header' => $header,
            'infos'  => $infos
        ];
    }
}